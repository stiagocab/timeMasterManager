import { Palette } from "./colors.keys";

export const lightThemeColors: Palette = {
  primary: "#B13BFF",
  primaryForeground: "#ffffff",

  secondary: "#471396",
  secondaryForeground: "#ffffff",

  accent: "#FFCC00",
  accentForeground: "#000000",

  background: "#ffffff",
  backgroundForeground: "#000000",

  surface: "#f2f0fa",
  surfaceForeground: "#000000",

  text: "#090040",
  textForeground: "#090040",

  border: "#ddd8f5",
  borderForeground: "#B13BFF",

  highlight: "#FFCC00",
  highlightForeground: "#000000",

  info: "#A1E3F9",
  infoForeground: "#000000",

  success: "#34d399",
  successForeground: "#000000",

  warning: "#facc15",
  warningForeground: "#000000",

  error: "#ef4444",
  errorForeground: "#ffffff",
};

export const darkThemeColors: Palette = {
  primary: "#B13BFF",
  primaryForeground: "#ffffff",

  secondary: "#471396",
  secondaryForeground: "#ffffff",

  accent: "#FFCC00",
  accentForeground: "#000000",

  background: "#090040",
  backgroundForeground: "#ffffff",

  surface: "#12004a",
  surfaceForeground: "#ffffff",

  text: "#ffffff",
  textForeground: "#B13BFF",

  border: "#271045",
  borderForeground: "#ffffff",

  highlight: "#FFCC00",
  highlightForeground: "#000000",

  info: "#A1E3F9",
  infoForeground: "#000000",

  success: "#34d399",
  successForeground: "#000000",

  warning: "#facc15",
  warningForeground: "#000000",

  error: "#ef4444",
  errorForeground: "#ffffff",
};

export const blueThemeColors: Palette = {
  primary: "#3674B5",
  primaryForeground: "#ffffff",

  secondary: "#578FCA",
  secondaryForeground: "#000000",

  accent: "#A1E3F9",
  accentForeground: "#000000",

  background: "#ffffff",
  backgroundForeground: "#000000",

  surface: "#D1F8EF",
  surfaceForeground: "#000000",

  text: "#1E1E1E",
  textForeground: "#3674B5",

  border: "#D1F8EF",
  borderForeground: "#000000",

  highlight: "#A1E3F9",
  highlightForeground: "#000000",

  info: "#A1E3F9",
  infoForeground: "#000000",

  success: "#34d399",
  successForeground: "#000000",

  warning: "#facc15",
  warningForeground: "#000000",

  error: "#ef4444",
  errorForeground: "#ffffff",
};

export const githubDarkThemeColors: Palette = {
  /* ─── Brand ────────────────────────────────────────── */
  primary: "#B13BFF",
  primaryForeground: "#ffffff",

  secondary: "#471396",
  secondaryForeground: "#ffffff",

  accent: "#FFCC00",
  accentForeground: "#000000",

  /* ─── Greys & bases (GitHub Dark) ──────────────────── */
  background: "#0d1117", // base‑0  :contentReference[oaicite:0]{index=0}
  backgroundForeground: "#c9d1d9", // default text  :contentReference[oaicite:1]{index=1}

  surface: "#161b22", // base‑1  :contentReference[oaicite:2]{index=2}
  surfaceForeground: "#c9d1d9",

  border: "#30363d", // base‑3  :contentReference[oaicite:3]{index=3}
  borderForeground: "#c9d1d9",

  text: "#c9d1d9",
  textForeground: "#B13BFF",

  /* ─── Functional / status colours (GitHub) ─────────── */
  highlight: "#2f81f7", // “accent‑fg” blue  :contentReference[oaicite:4]{index=4}
  highlightForeground: "#ffffff",

  info: "#2f81f7",
  infoForeground: "#ffffff",

  success: "#3fb950", // success‑fg  :contentReference[oaicite:5]{index=5}
  successForeground: "#000000",

  warning: "#d29922", // attention‑fg  :contentReference[oaicite:6]{index=6}
  warningForeground: "#000000",

  error: "#f85149", // danger‑fg  :contentReference[oaicite:7]{index=7}
  errorForeground: "#ffffff",
};

export const highContrastDarkThemeColors: Palette = {
  /* ─── Brand ────────────────────────────────────────── */
  primary: "#7C3AED", // violeta saturado
  primaryForeground: "#FFFFFF",

  secondary: "#2563EB", // azul vívido
  secondaryForeground: "#FFFFFF",

  accent: "#FF0080", // magenta neón
  accentForeground: "#FFFFFF",

  /* ─── Greys & bases ───────────────────────────────── */
  background: "#000000", // negro absoluto
  backgroundForeground: "#FFFFFF",

  surface: "#111111", // gris muy oscuro (elevación 1)
  surfaceForeground: "#FFFFFF",

  border: "#2E2E2E", // delineado sutil
  borderForeground: "#FFFFFF",

  text: "#FFFFFF",
  textForeground: "#7C3AED", // realza enlaces o marcas

  /* ─── Functional / status ─────────────────────────── */
  highlight: "#38BDF8", // cian brillante
  highlightForeground: "#000000",

  info: "#0EA5E9", // azul info
  infoForeground: "#FFFFFF",

  success: "#22C55E", // verde intenso
  successForeground: "#000000",

  warning: "#FACC15", // amarillo vívido
  warningForeground: "#000000",

  error: "#EF4444", // rojo vivo
  errorForeground: "#FFFFFF",
};

/* ───────────────────── 1. Dark High Contrast GREEN ───────────────────── */
export const highContrastDarkGreenThemeColors: Palette = {
  /* Brand */
  primary: "#22C55E", // verde lima intenso
  primaryForeground: "#000000",

  secondary: "#15803D", // verde bosque
  secondaryForeground: "#FFFFFF",

  accent: "#4ADE80", // menta luminosa
  accentForeground: "#000000",

  /* Greys & bases */
  background: "#000000",
  backgroundForeground: "#FFFFFF",

  surface: "#102212", // verde oscurísimo
  surfaceForeground: "#FFFFFF",

  border: "#1F3520",
  borderForeground: "#FFFFFF",

  text: "#FFFFFF",
  textForeground: "#22C55E",

  /* Status */
  highlight: "#34D399", // turquesa‑verde
  highlightForeground: "#000000",

  info: "#2DD4BF",
  infoForeground: "#000000",

  success: "#16A34A", // aprobado
  successForeground: "#FFFFFF",

  warning: "#FDE047",
  warningForeground: "#000000",

  error: "#F87171",
  errorForeground: "#000000",
};

/* ───────────────────── 2. Dark High Contrast COFFEE ──────────────────── */
export const highContrastDarkCoffeeThemeColors: Palette = {
  /* Brand */
  primary: "#D97706", // ámbar tostado
  primaryForeground: "#000000",

  secondary: "#92400E", // cacao oscuro
  secondaryForeground: "#FFFFFF",

  accent: "#FBBF24", // dorado miel
  accentForeground: "#000000",

  /* Greys & bases */
  background: "#000000",
  backgroundForeground: "#FFFFFF",

  surface: "#1A120B", // espresso profundo
  surfaceForeground: "#FFFFFF",

  border: "#332218",
  borderForeground: "#FFFFFF",

  text: "#FFFFFF",
  textForeground: "#D97706",

  /* Status */
  highlight: "#F59E0B", // caramelo
  highlightForeground: "#000000",

  info: "#FDBA74",
  infoForeground: "#000000",

  success: "#65A30D", // verde oliva
  successForeground: "#000000",

  warning: "#FACC15",
  warningForeground: "#000000",

  error: "#DC2626",
  errorForeground: "#FFFFFF",
};

/* ───────────────────────────── 1. Forest Night ───────────────────────────── */
export const forestNightThemeColors: Palette = {
  /* Brand */
  primary: "#4CAF50", // verde selva
  primaryForeground: "#E1F5E5",

  secondary: "#2E7D32", // verde musgo
  secondaryForeground: "#C8E6C9",

  accent: "#80CBC4", // jade suave
  accentForeground: "#00251A",

  /* Greys & bases */
  background: "#0B1110", // casi negro con tinte verde
  backgroundForeground: "#C8D5C4",

  surface: "#16201B", // hoja oscura
  surfaceForeground: "#D4E3CF",

  border: "#25332C",
  borderForeground: "#AEC8B4",

  text: "#DDEBDD",
  textForeground: "#4CAF50",

  /* Status */
  highlight: "#5DF2D6",
  highlightForeground: "#00251A",

  info: "#4DD0E1",
  infoForeground: "#002022",

  success: "#66BB6A",
  successForeground: "#002910",

  warning: "#FFD54F",
  warningForeground: "#332800",

  error: "#EF5350",
  errorForeground: "#2D0000",
};

/* ───────────────────────────── 2. Mocha Mist ─────────────────────────────── */
export const mochaMistThemeColors: Palette = {
  /* Brand */
  primary: "#B38B6D", // latte ambar
  primaryForeground: "#F5ECE6",

  secondary: "#8E5A3C", // café tostado
  secondaryForeground: "#F0E4DC",

  accent: "#D7B899", // espuma latte
  accentForeground: "#332014",

  /* Greys & bases */
  background: "#12100E", // marrón negruzco
  backgroundForeground: "#E3D7CF",

  surface: "#1E1A17", // moka profundo
  surfaceForeground: "#E8DDD5",

  border: "#322A25",
  borderForeground: "#C6B7AD",

  text: "#F0E8E1",
  textForeground: "#B38B6D",

  /* Status */
  highlight: "#C69E7C",
  highlightForeground: "#2D1B0E",

  info: "#A1887F",
  infoForeground: "#241A15",

  success: "#9CCC65",
  successForeground: "#19240A",

  warning: "#FFCA28",
  warningForeground: "#332300",

  error: "#E57373",
  errorForeground: "#2C0F0F",
};

/* ───────────────────── 1.  Sunset Coral ───────────────────── */
export const sunsetCoralColors: Palette = {
  /* Brand */
  primary: "#FF6B57", // coral intenso
  primaryForeground: "#FFFFFF",
  secondary: "#FF9770", // melón
  secondaryForeground: "#000000",
  accent: "#FFBFA3", // arena cálida
  accentForeground: "#000000",
  /* Greys & bases */
  background: "#1B0E08", // sombra crepuscular
  backgroundForeground: "#FFEDE6",
  surface: "#29150E",
  surfaceForeground: "#FFD6C5",
  border: "#5E2E22",
  borderForeground: "#FFD6C5",
  text: "#FFEDE6",
  textForeground: "#FF6B57",
  /* Status */
  highlight: "#FFA987",
  highlightForeground: "#000000",
  info: "#FF8552",
  infoForeground: "#000000",
  success: "#4CAF50",
  successForeground: "#FFFFFF",
  warning: "#FFB300",
  warningForeground: "#000000",
  error: "#FF5252",
  errorForeground: "#FFFFFF",
};

/* ───────────────────── 2.  Ocean Breeze ───────────────────── */
export const oceanBreezeColors: Palette = {
  primary: "#00B4D8", // turquesa
  primaryForeground: "#003241",
  secondary: "#0096C7", // azul océano
  secondaryForeground: "#E0F7FF",
  accent: "#90E0EF", // espuma marina
  accentForeground: "#003241",
  background: "#071C24", // azul profundo
  backgroundForeground: "#D0F2FF",
  surface: "#0D2630",
  surfaceForeground: "#B0E7FF",
  border: "#154154",
  borderForeground: "#B0E7FF",
  text: "#E0F7FF",
  textForeground: "#00B4D8",
  highlight: "#5EE1FF",
  highlightForeground: "#003241",
  info: "#4CC9F0",
  infoForeground: "#002532",
  success: "#1ABC9C",
  successForeground: "#00251F",
  warning: "#FFC300",
  warningForeground: "#332600",
  error: "#E63946",
  errorForeground: "#FFFFFF",
};

/* ───────────────────── 3.  Arctic Aurora ───────────────────── */
export const arcticAuroraColors: Palette = {
  primary: "#00E5FF", // azul aurora
  primaryForeground: "#002631",
  secondary: "#7CFFCB", // verde aurora
  secondaryForeground: "#00261D",
  accent: "#B388FF", // violeta polar
  accentForeground: "#1E0042",
  background: "#060B16", // noche ártica
  backgroundForeground: "#D0F7FF",
  surface: "#0C1222",
  surfaceForeground: "#B6EFFF",
  border: "#1C2334",
  borderForeground: "#B6EFFF",
  text: "#E2F8FF",
  textForeground: "#00E5FF",
  highlight: "#53F3FF",
  highlightForeground: "#002631",
  info: "#4CC9F0",
  infoForeground: "#002532",
  success: "#2AF598",
  successForeground: "#002615",
  warning: "#FEE440",
  warningForeground: "#332E00",
  error: "#FF5370",
  errorForeground: "#2E0010",
};

/* ───────────── 4 & 5.  Cherry Blossom – Light & Dark ───────────── */
export const cherryBlossomLightColors: Palette = {
  primary: "#FF80B5", // rosa sakura
  primaryForeground: "#400022",
  secondary: "#FFD6E8", // pétalo suave
  secondaryForeground: "#402033",
  accent: "#FFF5FA", // blanco rosado
  accentForeground: "#401823",
  background: "#FFF8FB",
  backgroundForeground: "#3F0F25",
  surface: "#FFEFF7",
  surfaceForeground: "#3F0F25",
  border: "#F9CEE2",
  borderForeground: "#3F0F25",
  text: "#3F0F25",
  textForeground: "#FF80B5",
  highlight: "#FFB3D6",
  highlightForeground: "#3F0F25",
  info: "#4CC9F0",
  infoForeground: "#002532",
  success: "#A7E9AF",
  successForeground: "#00331A",
  warning: "#FFCF56",
  warningForeground: "#332600",
  error: "#FF6B7E",
  errorForeground: "#401018",
};

export const cherryBlossomDarkColors: Palette = {
  primary: "#FF80B5",
  primaryForeground: "#2A0014",
  secondary: "#B63F73", // flor iluminada
  secondaryForeground: "#FFE7F1",
  accent: "#FFB3D6",
  accentForeground: "#2A0014",
  background: "#11060D", // cielo nocturno tokyo
  backgroundForeground: "#FFD9EA",
  surface: "#1A0B14",
  surfaceForeground: "#FFC8E1",
  border: "#36162B",
  borderForeground: "#FFC8E1",
  text: "#FFD9EA",
  textForeground: "#FF80B5",
  highlight: "#FF93C4",
  highlightForeground: "#2A0014",
  info: "#4CC9F0",
  infoForeground: "#002532",
  success: "#7EDFA2",
  successForeground: "#002A14",
  warning: "#FFC145",
  warningForeground: "#332600",
  error: "#FF6B8E",
  errorForeground: "#2A0014",
};
