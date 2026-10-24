#!/usr/bin/env node
/**
 * Lista o que ainda é provisório no conteúdo.
 *
 * Dois tipos, contados separadamente porque têm prazos diferentes:
 *
 * - **conteúdo**: `[PERÍODO]`, `[CARGO]`, `[RESUMO]`… informação que a cliente ainda não
 *   enviou. Bloqueia a publicação, mas não o desenvolvimento.
 * - **tradução**: valores prefixados com `[EN]` ou `[ES]` nos JSONs de idioma. Só se
 *   resolvem na etapa 13, com revisão humana.
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
    else if (EXTENSIONS.has(full.slice(full.lastIndexOf(".")))) files.push(full);
  }
  return files;
};

/** Comentário de código não renderiza, então não conta como pendência. */
const isComment = (line) => {
  const trimmed = line.trimStart();
  return trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*");
};

const content = new Map();
const translation = new Map();

const bump = (bucket, file, value) => {
  if (!bucket.has(file)) bucket.set(file, { count: 0, values: new Set() });
  const entry = bucket.get(file);
  entry.count += 1;
  entry.values.add(value);
};

for (const file of walk(TARGET_DIR)) {
  const rel = relative(ROOT, file).split("\\").join("/");
  const isJson = file.endsWith(".json");
  /**
   * Nos JSONs de inglês e espanhol o placeholder de conteúdo é herdado do português
   * (`[EN] [CARGO]`). Contá-lo lá infla o número com a mesma pendência três vezes; o que
   * interessa nesses arquivos é só o marcador de tradução.
   */
  const isTranslationFile = /\/messages\/(en|es)\.json$/.test(rel);

  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line) => {
      if (!isJson && isComment(line)) return;

      for (const value of line.match(PLACEHOLDER) ?? []) {
        if (TRANSLATION_MARKERS.has(value)) bump(translation, rel, value);
        else if (!isTranslationFile) bump(content, rel, value);
      }
    });
}

const report = (title, bucket, hint) => {
  const occurrences = [...bucket.values()].reduce((total, entry) => total + entry.count, 0);
  console.log(`\n${title} — ${occurrences} ocorrência(s) em ${bucket.size} arquivo(s)`);
  console.log(`  ${hint}`);
  if (occurrences === 0) return;

  for (const [file, entry] of [...bucket.entries()].sort((a, b) => b[1].count - a[1].count)) {
    console.log(`  ${String(entry.count).padStart(4)}  ${file}`);
    console.log(`         ${[...entry.values].sort().join(" ")}`);
  }
};

report("Conteúdo pendente", content, "bloqueia publicação, não desenvolvimento");
report("Tradução pendente", translation, "resolve na etapa 13, com revisão humana");

const total =
  [...content.values()].reduce((sum, entry) => sum + entry.count, 0) +
  [...translation.values()].reduce((sum, entry) => sum + entry.count, 0);

if (process.argv.includes("--strict") && total > 0) {
  console.error(`\n${total} pendência(s). Publicação bloqueada.`);
  process.exit(1);
}

console.log("\nRelatório gerado. Nada foi alterado.");
