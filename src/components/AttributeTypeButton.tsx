import { getAttributeTypeImgLink } from "../constants";

type AttributeTypeButtonProps = {
  attributeType: string;
  isActive?: boolean;
  onClick?: () => void;
};

function AttributeTypeButton(props: AttributeTypeButtonProps) {
  const { attributeType, isActive = false, onClick = () => {} } = props;
  return (
    <button
      className={`flex shrink-0 items-center gap-2 border px-2 py-1.5 text-left text-[11px] uppercase tracking-wide md:text-sm ${
        isActive
          ? "border-copper bg-copper text-ink"
          : "border-line bg-panel/60 text-paper hover:border-copper"
      }`}
      onClick={onClick}
    >
      <div className="icon-well h-6 w-6 shrink-0 rounded-full md:h-7 md:w-7">
        <img
          className="h-[62%] w-[62%] object-contain"
          src={getAttributeTypeImgLink(attributeType)}
          alt=""
        />
      </div>
      <span className="min-w-0 leading-tight">{attributeType}</span>
    </button>
  );
}

export default AttributeTypeButton;
