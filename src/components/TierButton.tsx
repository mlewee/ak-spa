import { ROMAN_NUMERALS, TIER_COLOR } from "../constants";

interface TierButtonProps {
  tier: number;
  onClick: () => void;
  isActive: boolean;
}

const TierButton = ({ tier, onClick, isActive }: TierButtonProps) => {
  const color = TIER_COLOR[tier];

  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center border font-display text-lg transition-colors"
      style={{
        borderColor: color,
        color: isActive ? "#090d12" : color,
        backgroundColor: isActive ? color : "transparent",
      }}
    >
      {ROMAN_NUMERALS[tier]}
    </button>
  );
};

export default TierButton;
