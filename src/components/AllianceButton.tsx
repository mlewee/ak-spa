import { getBondImage } from "../utils/getImageLink";

type AllianceButtonProps = {
  allianceName: string;
  isActive?: boolean;
  onClick?: () => void;
};

function AllianceButton(props: AllianceButtonProps) {
  const { allianceName, isActive = false, onClick = () => {} } = props;
  return (
    <button
      className={`flex w-28 shrink-0 items-center gap-2 border px-2 py-1.5 text-left text-[11px] md:w-32 md:text-sm ${
        isActive
          ? "border-copper bg-copper text-ink"
          : "border-line bg-panel/60 text-paper hover:border-copper"
      }`}
      onClick={onClick}
    >
      <div className="icon-well h-6 w-6 shrink-0 rounded-full md:h-7 md:w-7">
        <img
          className="h-[62%] w-[62%] object-contain"
          src={getBondImage(allianceName)}
          alt=""
        />
      </div>
      <span className="min-w-0 leading-tight">
        {allianceName === "Assist_Operator" ? "Assist" : allianceName}
      </span>
    </button>
  );
}

export default AllianceButton;
