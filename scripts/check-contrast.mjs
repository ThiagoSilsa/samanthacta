// Verifica contraste WCAG 2.1 dos pares de cor do projeto.
//
// Uso: node scripts/check-contrast.mjs [--debug]
//
// Os pares abaixo devem espelhar os tokens reais de src/app/globals.css.
// Ao mudar um token, atualize o par correspondente aqui — o script não lê o CSS.

const PAIRS = [
  // tema claro
  {
    label: "texto / fundo",
    fg: "#1d120e",
    bg: "#f3e5c2",
    min: 7,
    note: "texto principal",
  },
  {
    label: "secundário / fundo",
    fg: "#462e24",
    bg: "#f3e5c2",
    min: 4.5,
    note: "texto secundário",
  },
  {
    label: "vinho / fundo",
    fg: "#490b0c",
    bg: "#f3e5c2",
    min: 4.5,
    note: "link e CTA",
  },
  {
    label: "texto / muted",
    fg: "#1d120e",
    bg: "#e7d8b7",
    min: 4.5,
    note: "texto sobre fundo neutro",
  },
  {
    label: "secundário / muted",
    fg: "#462e24",
    bg: "#e7d8b7",
    min: 4.5,
    note: "apoio sobre fundo neutro",
  },
  {
    label: "texto / secondary",
    fg: "#1d120e",
    bg: "#e2dcc6",
    min: 4.5,
    note: "texto sobre azul misturado",
  },
  {
    label: "texto / accent",
    fg: "#1d120e",
    bg: "#dbd9c7",
    min: 4.5,
    note: "texto sobre destaque",
  },
  {
    label: "texto / azul",
    fg: "#1d120e",
    bg: "#a4bcd4",
    min: 4.5,
    note: "marcador sobre azul pleno",
  },
  {
    label: "creme / vinho",
    fg: "#f3e5c2",
    bg: "#490b0c",
    min: 4.5,
    note: "CTA preenchido",
  },

  // tema escuro
  {
    label: "creme / fundo",
    fg: "#f3e5c2",
    bg: "#1d120e",
    min: 7,
    note: "texto principal",
  },
  {
    label: "azul / fundo",
    fg: "#a4bcd4",
    bg: "#1d120e",
    min: 4.5,
    note: "texto secundário",
  },
  {
    label: "creme / popover",
    fg: "#f3e5c2",
    bg: "#462e24",
    min: 4.5,
    note: "superfície elevada",
  },
  {
    label: "creme / secondary",
    fg: "#f3e5c2",
    bg: "#353132",
    min: 4.5,
    note: "texto sobre destaque",
  },
  {
    label: "azul / muted",
    fg: "#a4bcd4",
    bg: "#322720",
    min: 4.5,
    note: "apoio sobre fundo neutro",
  },
  {
    label: "escuro / azul",
    fg: "#1d120e",
    bg: "#a4bcd4",
    min: 4.5,
    note: "CTA preenchido",
  },

  // foco — mínimo 3:1 para componentes de interface
  {
    label: "foco vinho / fundo",
    fg: "#490b0c",
    bg: "#f3e5c2",
    min: 3,
    note: "anel de foco no claro",
  },
  {
    label: "foco azul / fundo",
    fg: "#a4bcd4",
    bg: "#1d120e",
    min: 3,
    note: "anel de foco no escuro",
  },
];

const toRgb = (hex) => {
  const h = hex.replace("#", "").toLowerCase();
  if (!/^[0-9a-f]{6}$/.test(h)) throw new Error(`hex inválido: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (fg, bg) => {
  const a = luminance(fg);
  const b = luminance(bg);
  const hi = Math.max(a, b);
  const lo = Math.min(a, b);
  return { ratio: (hi + 0.05) / (lo + 0.05), fgLum: a, bgLum: b };
};

const debug = process.argv.includes("--debug");
let failures = 0;

console.log(
  "par".padEnd(28),
  "razão".padStart(6),
  "mínimo".padStart(7),
  "  resultado",
);
console.log("-".repeat(62));

for (const { label, fg, bg, min, note } of PAIRS) {
  const { ratio, fgLum, bgLum } = contrast(fg, bg);
  const ok = ratio >= min;
  if (!ok) failures += 1;
  console.log(
    label.padEnd(28),
    ratio.toFixed(2).padStart(6),
    min.toFixed(1).padStart(7),
    "  ",
    ok ? "ok" : "FALHA",
    " — ",
    note,
  );
  if (debug) {
    console.log(
      `   fg ${fg} L=${fgLum.toFixed(4)}  bg ${bg} L=${bgLum.toFixed(4)}`,
    );
  }
}

console.log("-".repeat(62));
if (failures > 0) {
  console.error(`${failures} par(es) abaixo do mínimo.`);
  process.exit(1);
}
console.log(`Todos os ${PAIRS.length} pares passam.`);
