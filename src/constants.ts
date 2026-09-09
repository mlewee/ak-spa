import { asset } from "./utils/asset";

export const TABS = ["Home", "Attributes", "Alliances", "Strategies", "Items"] as const;

export const SEASONS = ["1", "2", "2.1"] as const;

export const SEASON_OPTIONS = [
  { value: "1", title: "First Season" },
  { value: "2.1", title: "Second Season" },
  { value: "2", title: "Second Season (CN pre-patch)" },
];

export const ROMAN_NUMERALS: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
};

export const TIER_COLOR: Record<number, string> = {
  1: "#7d8694",
  2: "#d7cfc0",
  3: "#7eb8a2",
  4: "#6aa8c9",
  5: "#e2b65c",
  6: "#d47a4a",
};

export function getAttributeTypeImgLink(name: string) {
  if (name === "Specialized") return asset("/attributeicons/s_icon_support.png");
  if (name === "Combat") return asset("/attributeicons/s_icon_battle.png");
  if (name === "Prep") return asset("/attributeicons/s_icon_gold.png");
  return asset("/attributeicons/s_icon_bond.png");
}
