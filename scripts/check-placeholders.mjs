#!/usr/bin/env node
/**
 * Lista o que ainda é provisório no conteúdo.
 *
 * Dois tipos, contados separadamente porque têm prazos diferentes:
 *
 * - **conteúdo**: `[PERÍODO]`, `[CARGO]`, `[RESUMO]`… informação que a cliente ainda não
 *   enviou. Bloqueia a publicação, mas não o desenvolvimento. Conta nos três idiomas,
 *   porque o visitante em EN ou ES também vê o colchete.
 * - **tradução**: valores prefixados com `[EN]` ou `[ES]` nos JSONs de idioma. A tradução
 *   é feita por IA e conferida pela cliente — o marcador só existe enquanto a string não
 *   foi traduzida.
 *
 * Também confere se os idiomas estão **em sincronia**: um placeholder que sobreviveu em EN
 * ou ES depois de resolvido em PT é tradução esquecida, e passaria despercebido.
 *
 * Uso:
 *   node scripts/check-placeholders.mjs            # relatório, sempre sai com 0
 *   node scripts/check-placeholders.mjs --strict   # sai com 1 se houver qualquer pendência
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const TARGET_DIR = join(ROOT, "src");
const EXTENSIONS = new Set([".ts", ".tsx", ".json"]);

/** Marcador visível: maiúsculas entre colchetes. `[slug]` de rota não casa. */
const PLACEHOLDER = /\[[A-ZÁÂÃÀÉÊÍÓÔÕÚÇ][A-ZÁÂÃÀÉÊÍÓÔÕÚÇ0-9\s/_.-]*\]/g;
const TRANSLATION_MARKERS = new Set(["[EN]", "[ES]"]);

const walk = (dir) => {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (EXTENSIONS.has(full.slice(full.lastIndexOf("."))))
      files.push(full);
  }
  return files;
};

/** Comentário de código não renderiza, então não conta como pendência. */
const isComment = (line) => {
  const trimmed = line.trimStart();
  return (
    trimmed.startsWith("//") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("/*")
  );
};

const content = new Map();
const translation = new Map();
/** Tokens de placeholder por idioma, para detectar tradução esquecida. */
const tokensByLocale = new Map();

const bump = (bucket, file, value) => {
  if (!bucket.has(file)) bucket.set(file, { count: 0, values: new Set() });
  const entry = bucket.get(file);
  entry.count += 1;
  entry.values.add(value);
};

for (const file of walk(TARGET_DIR)) {
  const rel = relative(ROOT, file).split("\\").join("/");
  const isJson = file.endsWith(".json");
  const locale = rel.match(/messages\/(pt|en|es)\.json$/)?.[1];

  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line) => {
      if (!isJson && isComment(line)) return;

      for (const value of line.match(PLACEHOLDER) ?? []) {
        if (TRANSLATION_MARKERS.has(value)) bump(translation, rel, value);
        else {
          bump(content, rel, value);
          if (locale) {
            if (!tokensByLocale.has(locale))
              tokensByLocale.set(locale, new Set());
            tokensByLocale.get(locale).add(value);
          }
        }
      }
    });
}

const report = (title, bucket, hint) => {
  const occurrences = [...bucket.values()].reduce(
    (total, entry) => total + entry.count,
    0,
  );
  console.log(
    `\n${title} — ${occurrences} ocorrência(s) em ${bucket.size} arquivo(s)`,
  );
  console.log(`  ${hint}`);
  if (occurrences === 0) return;

  for (const [file, entry] of [...bucket.entries()].sort(
    (a, b) => b[1].count - a[1].count,
  )) {
    console.log(`  ${String(entry.count).padStart(4)}  ${file}`);
    console.log(`         ${[...entry.values].sort().join(" ")}`);
  }
};

report(
  "Conteúdo pendente",
  content,
  "bloqueia publicação, não desenvolvimento; conta nos três idiomas",
);
report(
  "Tradução pendente",
  translation,
  "tradução por IA a partir do pt; revisão em docs/traducao-revisao.md",
);

/**
 * Placeholder que existe em EN/ES e não existe em PT é sobra: o texto em português já
 * recebeu conteúdo real e a tradução não acompanhou.
 */
const ptTokens = tokensByLocale.get("pt") ?? new Set();
const desync = [];
for (const locale of ["en", "es"]) {
  for (const token of tokensByLocale.get(locale) ?? []) {
    if (!ptTokens.has(token)) desync.push(`${locale}: ${token}`);
  }
}

/**
 * Chave criada no `pt.json` e esquecida nos outros idiomas não aparece em lugar nenhum: o
 * next-intl não encontra a mensagem e a página mostra a chave crua. Comparar as árvores de
 * chaves é a única forma de ver isso antes de abrir a página em inglês.
 */
const keyPaths = (value, prefix = "") => {
  if (Array.isArray(value))
    return value.flatMap((item, index) =>
      keyPaths(item, `${prefix}[${index}]`),
    );
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  return [prefix];
};

const messages = new Map();
for (const locale of ["pt", "en", "es"]) {
  const file = join(TARGET_DIR, "messages", `${locale}.json`);
  try {
    messages.set(
      locale,
      new Set(keyPaths(JSON.parse(readFileSync(file, "utf8")))),
    );
  } catch {
    messages.set(locale, new Set());
  }
}

const ptKeys = messages.get("pt") ?? new Set();
const missingKeys = [];
for (const locale of ["en", "es"]) {
  const keys = messages.get(locale) ?? new Set();
  for (const key of ptKeys)
    if (!keys.has(key)) missingKeys.push(`${locale}: falta ${key}`);
  for (const key of keys)
    if (!ptKeys.has(key)) missingKeys.push(`${locale}: sobra ${key}`);
}

console.log(`\nIdiomas em sincronia`);
if (desync.length === 0 && missingKeys.length === 0) {
  console.log("  sim — chaves e placeholders batem entre pt, en e es");
} else {
  if (desync.length > 0) {
    console.log(
      `  não — ${desync.length} placeholder(s) sem equivalente em pt.json`,
    );
    for (const item of desync.sort()) console.log(`    ${item}`);
  }
  if (missingKeys.length > 0) {
    console.log(`  não — ${missingKeys.length} chave(s) fora de sincronia`);
    for (const item of missingKeys.sort()) console.log(`    ${item}`);
  }
}

const total =
  [...content.values()].reduce((sum, entry) => sum + entry.count, 0) +
  [...translation.values()].reduce((sum, entry) => sum + entry.count, 0);

if (
  process.argv.includes("--strict") &&
  (total > 0 || desync.length > 0 || missingKeys.length > 0)
) {
  console.error(`\n${total} pendência(s). Publicação bloqueada.`);
  process.exit(1);
}

console.log("\nRelatório gerado. Nada foi alterado.");
