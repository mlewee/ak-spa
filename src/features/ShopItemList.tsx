import { useEffect, useState } from "react";
import { getItemsBySeason, getAlliancesBySeason } from "../utils/getDataBySeason";
import { ROMAN_NUMERALS, TIER_COLOR } from "../constants";
import { asset } from "../utils/asset";
import PageHeader from "../components/PageHeader";
import RichText from "../components/RichText";
import type { AllianceDto } from "../dtos/alliance.dto";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

type ShopItemDto = {
  iconLink: string;
  itemName: string;
  effectDesc: string;
  cost: number | null;
  tier: number | null;
};

const mumuballCombinationsSeason1: Record<string, string[]> = {
  yanship: ["trap_1040_acarm040"],
  victoriaship: [
    "trap_1041_acarm041",
    "trap_1042_acarm042",
    "trap_1043_acarm043",
    "trap_1044_acarm044",
    "trap_1045_acarm045",
  ],
  egirship: ["trap_1046_acarm046"],
  steadship: ["trap_1047_acarm047"],
  sargonship: ["trap_1050_acarm050"],
  indomship: ["trap_1056_acarm056"],
  lateranoship: ["trap_1057_acarm057"],
  kjeragship: ["trap_1062_acarm062"],
  preciship: ["trap_1063_acarm063"],
  raidship: ["trap_1064_acarm064"],
  swiftship: ["trap_1051_acarm051"],
};

const mumuballCombinationsSeason2: Record<string, string[]> = {
  yanship: ["trap_1040_acarm040"],
  victoriaship: [
    "trap_1041_acarm041",
    "trap_1042_acarm042",
    "trap_1043_acarm043",
    "trap_1044_acarm044",
    "trap_1045_acarm045",
  ],
  egirship: ["trap_1046_acarm046"],
  steadship: ["trap_1047_acarm047"],
  sargonship: ["trap_1050_acarm050"],
  siracusaship: ["trap_1121_acarm121"],
  kazimierzship: ["trap_1119_acarm119"],
  indomship: ["trap_1056_acarm056"],
  lateranoship: ["trap_1057_acarm057"],
  kjeragship: ["trap_1062_acarm062"],
  preciship: ["trap_1063_acarm063"],
  raidship: ["trap_1064_acarm064"],
  swiftship: ["trap_1051_acarm051"],
  arcaneship: ["trap_1048_acarm048"],
};

type ShopItemListProps = {
  season: string;
};

const ShopItemList = ({ season }: ShopItemListProps) => {
  const items: ShopItemDto[] = getItemsBySeason(season);
  const allianceData: AllianceDto[] = getAlliancesBySeason(season);
  const [victorianHammerIndex, setvictorianHammerIndex] = useState(0);
  const [hoveredBond, setHoveredBond] = useState<string | null>(null);
  const [hoveredKit, setHoveredKit] = useState<string | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: hoveredBond !== null || hoveredKit !== null,
    onOpenChange: (open) => {
      if (!open) {
        setHoveredBond(null);
        setHoveredKit(null);
      }
    },
    placement: "bottom",
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);

  const getAlliance = (bondId: string): AllianceDto | undefined =>
    allianceData.find((a) => a.bondId === bondId);

  const getAllianceName = (bondId: string): string => getAlliance(bondId)?.name ?? bondId;

  const mumuballCombinations =
    season !== "1" ? mumuballCombinationsSeason2 : mumuballCombinationsSeason1;

  useEffect(() => {
    const id = setInterval(() => {
      setvictorianHammerIndex((i) => (i + 1) % mumuballCombinations["victoriaship"].length);
    }, 1000);

    return () => clearInterval(id);
  }, [mumuballCombinations]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
      <PageHeader kicker="Supply depot" title="Items" note={`season ${season}`} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.iconLink} className="dossier flex items-start gap-4 p-4">
            <div className="flex w-20 shrink-0 flex-col items-center gap-2 text-center text-[13px] leading-tight md:text-[15px]">
              <div className="icon-well relative h-20 w-20">
                <img
                  src={asset(`/shopitemicons/${item.iconLink}.png`)}
                  className="h-4/5 w-4/5 object-contain"
                  alt=""
                />
                {item.tier && (
                  <div
                    className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center border bg-ink/70 font-mono text-xs"
                    style={{
                      color: TIER_COLOR[item.tier],
                      borderColor: TIER_COLOR[item.tier],
                    }}
                  >
                    {ROMAN_NUMERALS[item.tier]}
                  </div>
                )}
              </div>
              <span className="font-display tracking-wide">{item.itemName}</span>
            </div>
            <div className="min-w-0">
              {item.cost && (
                <div className="mb-1 flex items-center font-mono text-ember">
                  {item.cost}
                  <img src={asset("/fund.png")} className="ml-1 h-4 object-contain" alt="" />
                </div>
              )}
              <RichText html={item.effectDesc} />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-3xl tracking-wide text-ember">Damazti Isomorph equipment</h2>
        <p className="mt-1 mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Isomorph + kit = alliance imprint
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Object.keys(mumuballCombinations).map((key) => {
            const matched =
              items.filter((i) => mumuballCombinations[key].find((value) => value === i.iconLink)) ??
              [];
            const kitItem: ShopItemDto | undefined =
              matched.length === 1 ? matched[0] : matched[victorianHammerIndex];
            return (
              <div
                key={key}
                className="dossier flex items-center justify-center gap-4 p-4 font-display text-2xl text-muted"
              >
                <div className="icon-well h-18 w-18">
                  <img
                    src={asset("/shopitemicons/trap_1073_acgarm073.png")}
                    className="h-4/5 w-4/5 object-contain"
                    alt=""
                  />
                </div>
                +
                <div
                  className="icon-well h-18 w-18"
                  onMouseEnter={(event) => {
                    refs.setReference(event.currentTarget);
                    setHoveredKit(key);
                  }}
                  onMouseLeave={() => setHoveredKit(null)}
                >
                  <img
                    src={asset(
                      `/shopitemicons/${kitItem?.iconLink}.png`,
                    )}
                    className="h-4/5 w-4/5 object-contain"
                    alt=""
                  />
                  {hoveredKit === key && kitItem && (
                    <FloatingPortal>
                      <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                        className="dossier z-50 w-72 px-4 py-3"
                      >
                        <div className="text-left text-paper">
                          <strong className="font-display text-lg tracking-wide text-ember">
                            {kitItem.itemName}
                          </strong>
                          <br />
                          <RichText html={kitItem.effectDesc} className="mt-1" />
                        </div>
                      </div>
                    </FloatingPortal>
                  )}
                </div>
                =
                <div
                  className="icon-well h-18 w-18"
                  onMouseEnter={(event) => {
                    refs.setReference(event.currentTarget);
                    setHoveredBond(key);
                  }}
                  onMouseLeave={() => setHoveredBond(null)}
                >
                  <img
                    src={asset(`/bondicons/icon_${key}.png`)}
                    className="h-4/5 w-4/5 object-contain"
                    alt=""
                  />
                  {hoveredBond === key && (
                    <FloatingPortal>
                      <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                        className="dossier z-50 w-72 px-4 py-3"
                      >
                        <div className="text-left text-paper">
                          <strong className="font-display text-lg tracking-wide text-ember">
                            {getAllianceName(key)}
                          </strong>
                          {getAlliance(key) && (
                            <>
                              <br />
                              <RichText html={getAlliance(key)!.desc} className="mt-1" />
                            </>
                          )}
                        </div>
                      </div>
                    </FloatingPortal>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopItemList;
