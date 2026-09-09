import AllianceButton from "../components/AllianceButton";
import AttributeTypeButton from "../components/AttributeTypeButton";
import TierButton from "../components/TierButton";
import OperatorCard from "../components/OperatorCard";
import PageHeader from "../components/PageHeader";
import type { OperatorDto } from "../dtos/operator.dto";
import { useState } from "react";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getAlliancesBySeason, getOperatorsBySeason } from "../utils/getDataBySeason";

const ATTRIBUTE_TYPES = ["Combat", "Prep", "Specialized", "One-time", "Can stack"] as const;

type AttributeListProps = {
  season: string;
};

const AttributeList = ({ season }: AttributeListProps) => {
  const [activeCoreAlliances, setActiveCoreAlliances] = useState<string[]>([]);
  const [activeAddAlliances, setActiveAddAlliances] = useState<string[]>([]);
  const [activeTiers, setActiveTiers] = useState<number[]>([]);
  const [activeAttributeTypes, setActiveAttributeTypes] = useState<string[]>([]);

  const toggleCoreAlliance = (alliance: string) => {
    setActiveCoreAlliances((prev) =>
      prev.includes(alliance) ? prev.filter((item) => item !== alliance) : [...prev, alliance],
    );
  };

  const toggleAddAlliance = (alliance: string) => {
    setActiveAddAlliances((prev) =>
      prev.includes(alliance) ? prev.filter((item) => item !== alliance) : [...prev, alliance],
    );
  };

  const toggleTiers = (tier: number) => {
    setActiveTiers((prev) =>
      prev.includes(tier) ? prev.filter((item) => item !== tier) : [...prev, tier],
    );
  };

  const toggleAttributeType = (attributeType: string) => {
    setActiveAttributeTypes((prev) =>
      prev.includes(attributeType)
        ? prev.filter((item) => item !== attributeType)
        : [...prev, attributeType],
    );
  };

  const allianceData: AllianceDto[] = getAlliancesBySeason(season);
  const coreAlliances = allianceData.filter((alliance) => alliance.core === true);
  const additionalAlliances = allianceData.filter(
    (alliance) => alliance.core !== true && alliance.noFilter !== true,
  );
  const operatorData: OperatorDto[] = getOperatorsBySeason(season);

  const filteredList = operatorData.filter(
    (op) =>
      activeCoreAlliances.every((a) => op.alliances.includes(a)) &&
      activeAddAlliances.every((a) => op.alliances.includes(a)) &&
      (activeTiers.length === 0 || activeTiers.includes(op.tier)) &&
      (activeAttributeTypes.length === 0 || activeAttributeTypes.includes(op.attributeType)),
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
      <PageHeader kicker="Operator ledger" title="Attributes" note={`season ${season}`} />

      <div className="dossier mb-6 flex flex-col items-center gap-4 p-4">
        <div className="flex flex-row flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((tier) => (
            <TierButton
              key={tier}
              tier={tier}
              onClick={() => toggleTiers(tier)}
              isActive={activeTiers.includes(tier)}
            />
          ))}
        </div>
        <div className="flex w-full max-w-3xl flex-row flex-wrap justify-center gap-2">
          {ATTRIBUTE_TYPES.map((attributeType) => (
            <AttributeTypeButton
              attributeType={attributeType}
              key={attributeType}
              isActive={activeAttributeTypes.includes(attributeType)}
              onClick={() => toggleAttributeType(attributeType)}
            />
          ))}
        </div>
        <div className="flex w-full max-w-3xl flex-row flex-wrap justify-center gap-2">
          {coreAlliances.map((alliance) => (
            <AllianceButton
              allianceName={alliance.name}
              key={alliance.bondId}
              isActive={activeCoreAlliances.includes(alliance.name)}
              onClick={() => toggleCoreAlliance(alliance.name)}
            />
          ))}
        </div>
        <div className="flex w-full max-w-3xl flex-row flex-wrap justify-center gap-2">
          {additionalAlliances.map((alliance) => (
            <AllianceButton
              allianceName={alliance.name}
              key={alliance.bondId}
              isActive={activeAddAlliances.includes(alliance.name)}
              onClick={() => toggleAddAlliance(alliance.name)}
            />
          ))}
        </div>
        <p className="font-mono text-[11px] text-muted">{filteredList.length} operators in view</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredList.map((operator) => (
          <OperatorCard key={operator.name} operator={operator} allianceData={allianceData} />
        ))}
      </div>
    </div>
  );
};

export default AttributeList;
