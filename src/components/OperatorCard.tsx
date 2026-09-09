import type { OperatorDto } from "../dtos/operator.dto";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getBondImage } from "../utils/getImageLink";
import { getAttributeTypeImgLink, ROMAN_NUMERALS, TIER_COLOR } from "../constants";
import { asset } from "../utils/asset";
import RichText from "./RichText";
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

type OperatorCardProps = {
  operator: OperatorDto;
  allianceData?: AllianceDto[];
};

function OperatorCard(props: OperatorCardProps) {
  const { operator, allianceData = [] } = props;

  const navigateToTerraWiki = (opName: string) => {
    window.open(`https://arknights.wiki.gg/wiki/${opName}`, "_blank");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredAlliance, setHoveredAlliance] = useState<string | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);

  const formatAllianceName = (name: string): string => {
    return name === "Assist_Operator" ? "Assist" : name;
  };

  const getAllianceInfo = (allianceName: string): AllianceDto | undefined => {
    return allianceData.find((a) => a.name === allianceName);
  };

  return (
    <article className="dossier flex w-full items-start gap-4 p-4">
      <div className="flex w-16 shrink-0 flex-col items-center text-center text-[12px] leading-tight md:text-[13px]">
        <button
          className="relative mb-1.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
          onClick={() => navigateToTerraWiki(operator.name)}
        >
          <img
            src={asset(`/operatoricons/90px-${operator.name.replace(/\s+/g, "_")}_icon.webp`)}
            className="h-16 w-16 border border-line object-cover"
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
        </button>
        {operator.name}
      </div>

      <div className="flex min-w-0 flex-col items-start">
        <div className="flex flex-row flex-wrap gap-1 pb-2 md:gap-1.5">
          {operator.alliances.map((alliance) => {
            const allianceInfo = getAllianceInfo(alliance);
            const displayName = formatAllianceName(alliance);
            return (
              <div
                key={alliance}
                className="icon-well h-7 w-7 rounded-full"
                onMouseEnter={(event) => {
                  refs.setReference(event.currentTarget);
                  setHoveredAlliance(alliance);
                  setIsOpen(true);
                }}
                onMouseLeave={() => {
                  setIsOpen(false);
                }}
              >
                <img
                  className="h-[62%] w-[62%] object-contain"
                  src={getBondImage(alliance)}
                  alt={alliance}
                />
                {isOpen && hoveredAlliance === alliance && (
                  <FloatingPortal>
                    <div
                      ref={refs.setFloating}
                      style={floatingStyles}
                      {...getFloatingProps()}
                      className="dossier z-50 w-72 px-4 py-3"
                    >
                      <div className="text-left text-paper">
                        <strong className="font-display text-lg tracking-wide text-ember">
                          {displayName}
                        </strong>
                        {allianceInfo && (
                          <>
                            <br />
                            <RichText html={allianceInfo.desc} className="mt-1" />
                          </>
                        )}
                      </div>
                    </div>
                  </FloatingPortal>
                )}
              </div>
            );
          })}
        </div>
        <div className="mb-1.5 inline-flex items-center gap-1 border border-line bg-ink px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted md:text-[11px]">
          <img
            src={getAttributeTypeImgLink(operator.attributeType)}
            className="h-3.5 w-3.5 object-contain"
            alt=""
          />
          {operator.attributeType}
        </div>
        <RichText html={operator.attribute} className="text-paper/90" />
      </div>
    </article>
  );
}

export default OperatorCard;
