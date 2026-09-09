import type { OperatorDto } from "../dtos/operator.dto";
import { getAttributeTypeImgLink, ROMAN_NUMERALS } from "../constants";
import RichText from "./RichText";

type OperatorAttributeTooltipProps = {
  operator: OperatorDto;
};

function OperatorAttributeTooltip(props: OperatorAttributeTooltipProps) {
  const { operator } = props;

  return (
    <div className="text-left text-paper">
      <strong className="font-display text-lg tracking-wide text-ember">{operator.name}</strong>{" "}
      <span className="font-mono text-muted">({ROMAN_NUMERALS[operator.tier]})</span>
      <br />
      <span className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-muted">
        <img
          src={getAttributeTypeImgLink(operator.attributeType)}
          className="h-4 w-4 object-contain"
          alt=""
        />
        {operator.attributeType}
      </span>
      <RichText html={operator.attribute} className="mt-2" />
    </div>
  );
}

export default OperatorAttributeTooltip;
