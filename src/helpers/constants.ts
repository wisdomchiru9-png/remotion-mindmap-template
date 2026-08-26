import { loadFont } from "@remotion/google-fonts/EBGaramond";
import { Easing } from "remotion";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

export const FONT_FAMILY = fontFamily;

export const COLORS = {
  bg: "#0a0a0f",
  bgWarm: "#120c08",
  text: "#f0ece4",
  accent: "#ff6b2b",
  accentLight: "#ff9a44",
  grid: "rgba(255,255,255,0.04)",
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.1)",
  glow: "rgba(255,107,43,0.15)",
  wall: "rgba(255,255,255,0.08)",
  wallBorder: "rgba(255,107,43,0.3)",
};

export const EASINGS = {
  crispEntrance: Easing.bezier(0.16, 1, 0.3, 1),
  editorial: Easing.bezier(0.45, 0, 0.55, 1),
  pop: Easing.bezier(0.34, 1.56, 0.64, 1),
  heavyOut: Easing.bezier(0, 0, 0.2, 1),
};
