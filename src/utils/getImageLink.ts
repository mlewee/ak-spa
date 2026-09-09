import { asset } from "./asset";

export function getBondImage(type: string) {
  const table: Record<string, string> = {
    Arcane: "arcaneship",
    Aid: "deputship",
    Ægir: "egirship",
    Assist_Operator: "emptyship",
    Resilient: "indomship",
    Investor: "investship",
    Kazimierz: "kazimierzship",
    Kjerag: "kjeragship",
    Laterano: "lateranoship",
    Harmony: "maniship",
    Marvel: "miraship",
    Precision: "preciship",
    Raid: "raidship",
    Sargon: "sargonship",
    Siracusa: "siracusaship",
    Agile: "skillfulship",
    Solo: "soloship",
    Durable: "steadship",
    Elite: "suntship",
    Swift: "swiftship",
    Victoria: "victoriaship",
    Foresight: "visiship",
    Yan: "yanship",
  };
  const id = table[type];
  return id ? asset(`/bondicons/icon_${id}.png`) : "";
}
