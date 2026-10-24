#!/usr/bin/env node
/**
 * Lista o que ainda é provisório no conteúdo.
 *
 * Dois tipos, contados separadamente porque têm prazos diferentes:
 *
 * - **conteúdo**: `[PERÍODO]`, `[CARGO]`, `[RESUMO]`… informação que a cliente ainda não
 *   enviou. Bloqueia a publicação, mas não o desenvolvimento.
 * - **tradução**: prefixos `[EN]` e `[ES]` gerados por `untranslated()`. Só se resolvem na
 *   etapa 13, com revisão humana.
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
const EXTENSIONS = new Set([".ts", ".tsx"]);

/** Marcador visível: maiúsculas entre colchetes. `[slug]` de rota não casa. */
const PLACEHOLDER = /\[[A-ZÁÂÃÀÉÊÍÓÔÕÚÇ][A-ZÁÂÃÀÉÊÍÓÔÕÚÇ0-9\s/_.-]*\]/g;

/**
 * Cada chamada marca um texto que só existe em português. Contar os literais `[EN]`/`[ES]`
 * não serve: eles são montados em runtime dentro do helper.
 */
const TRANSLATION_CALL = /\buntranslated(?:List)?\(/g;

/** O helper é o mecanismo, não conteúdo — não entra no relatório. */
const EXCLUDED_FILES = new Set(["src/lib/localized.ts"]);

const walk = (dir) => {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (EXTENSIONS.has(full.slice(full.lastIndexOf("."))))
      files.push(full);
  }
  return files;
};

/** Comentário não renderiza, então não conta como pendência de conteúdo. */
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

for (const file of walk(TARGET_DIR)) {
  const rel = relative(ROOT, file).split("\\").join("/");
  if (EXCLUDED_FILES.has(rel)) continue;

  const lines = readFileSync(file, "utf8").split("\n");

  lines.forEach((line) => {
    if (isComment(line)) return;

    const bump = (bucket, value) => {
      if (!bucket.has(rel)) bucket.set(rel, { count: 0, values: new Set() });
      const entry = bucket.get(rel);
      entry.count += 1;
      entry.values.add(value);
    };

    for (const value of line.match(PLACEHOLDER) ?? []) bump(content, value);

    const untranslatedCalls = line.match(TRANSLATION_CALL) ?? [];
    untranslatedCalls.forEach(() => bump(translation, "texto só em português"));
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
  if (hint) console.log(`  ${hint}`);
  if (occurrences === 0) return;

  for (const [file, entry] of [...bucket.entries()].sort(
    (a, b) => b[1].count - a[1].count,
  )) {
    const values = [...entry.values].sort().join(" ");
    console.log(`  ${String(entry.count).padStart(3)}  ${file}`);
    console.log(`       ${values}`);
  }
};

report(
  "Conteúdo pendente",
  content,
  "bloqueia publicação, não desenvolvimento",
);
report(
  "Tradução pendente",
  translation,
  "resolve na etapa 13, com revisão humana",
);

const total =
  [...content.values()].reduce((sum, entry) => sum + entry.count, 0) +
  [...translation.values()].reduce((sum, entry) => sum + entry.count, 0);

if (process.argv.includes("--strict") && total > 0) {
  console.error(`\n${total} pendência(s). Publicação bloqueada.`);
  process.exit(1);
}

console.log("\nRelatório gerado. Nada foi alterado.");
