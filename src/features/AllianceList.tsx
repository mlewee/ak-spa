import type { OperatorDto } from "../dtos/operator.dto";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getAlliancesBySeason, getOperatorsBySeason } from "../utils/getDataBySeason";
import { useState } from "react";
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
import OperatorAttributeTooltip from "../components/OperatorAttributeTooltip";
import PageHeader from "../components/PageHeader";
import RichText from "../components/RichText";
import { ROMAN_NUMERALS, TIER_COLOR } from "../constants";
import { asset } from "../utils/asset";

type AllianceListProps = {
  season: string;
};

const AllianceList = ({ season }: AllianceListProps) => {
  const allianceData: AllianceDto[] = getAlliancesBySeason(season);
  const operatorData: OperatorDto[] = getOperatorsBySeason(season);

  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  const dismiss = useDismiss(context, {
    outsidePress: () => {
      setIsPinned(false);
      return true;
    },
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  const [selectedOperatorTooltip, setSelectedOperatorTooltip] = useState<{
    operator: OperatorDto;
    alliance: AllianceDto;
  } | null>(null);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
      <PageHeader kicker="Bond protocols" title="Alliances" note={`season ${season}`} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {allianceData.map((alliance) => {
          const bondKey = alliance.name.replaceAll(" ", "_");
          const ops = operatorData.filter(
            (op) => op.alliances.includes(alliance.name) || op.alliances.includes(bondKey),
          );
          return (
            <section key={alliance.bondId} className="dossier flex flex-col gap-4 p-4 md:p-5">
              <div className="flex items-start gap-4">
                <div className="flex w-20 shrink-0 flex-col items-center gap-2 text-center text-[13px] leading-tight md:text-[16px]">
                  <div className="icon-well h-20 w-20 rounded-full">
                    <img
                      src={asset(`/bondicons/icon_${alliance.bondId}.png`)}
                      className="h-12 w-12 object-contain"
                      alt=""
                    />
                  </div>
                  <span className="font-display tracking-wide">
                    {alliance.name.replaceAll("_", " ")}
                  </span>
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="mb-1 font-mono text-[11px] uppercase tracking-wide text-muted">
                    Requires{" "}
                    <span className="text-ember">{alliance.activeCount}</span>{" "}
                    {alliance.activeCount == 1 ? "operator" : "operators"}
                  </span>
                  <RichText html={alliance.desc} />
                </div>
              </div>
              <div className="flex flex-row flex-wrap justify-center gap-1">
								{ops.map((operator) => {
									return (
										<div
											key={operator.name}
											className="relative mb-1 cursor-pointer"
											onMouseEnter={(event) => {
												if (isPinned) return;
												refs.setReference(event.currentTarget);
												setSelectedOperatorTooltip({ operator, alliance });
												setIsOpen(true);
											}}
											onMouseLeave={() => {
												if (!isPinned) setIsOpen(false);
											}}
											onClick={(event) => {
												refs.setReference(event.currentTarget);
												setSelectedOperatorTooltip({ operator, alliance });
												setIsPinned(true);
												setIsOpen(true);
											}}
										>
											<img
												src={asset(`/operatoricons/90px-${operator.name.replace(/\s+/g, "_")}_icon.webp`)}
												className="h-14 w-14 border border-line"
												alt={operator.name}
											/>
											<div
												className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center border bg-ink/70 font-mono text-[10px]"
												style={{
													color: TIER_COLOR[operator.tier],
													borderColor: TIER_COLOR[operator.tier],
												}}
											>
												{ROMAN_NUMERALS[operator.tier]}
											</div>
											{isOpen &&
												selectedOperatorTooltip?.alliance === alliance &&
												selectedOperatorTooltip.operator === operator && (
													<FloatingPortal>
														<div
															ref={refs.setFloating}
															style={floatingStyles}
															{...getFloatingProps()}
															className="dossier z-50 w-72 px-4 py-3"
														>
															<OperatorAttributeTooltip operator={operator} />
														</div>
													</FloatingPortal>
												)}
										</div>
									);
								})}
							</div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default AllianceList;
