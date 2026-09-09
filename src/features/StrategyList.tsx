import { getStrategiesBySeason } from "../utils/getDataBySeason";
import { asset } from "../utils/asset";
import PageHeader from "../components/PageHeader";
import RichText from "../components/RichText";

type StrategyDto = {
  name: string;
  iconLink: string;
  initialHp: number;
  effectName: string;
  effectDesc: string;
};

type StrategyListProps = {
  season: string;
};

const StrategyList = ({ season }: StrategyListProps) => {
  const strats: StrategyDto[] = getStrategiesBySeason(season);
  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
      <PageHeader kicker="Opening doctrine" title="Strategies" note={`season ${season}`} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {strats.map((strategy) => (
          <article key={strategy.name} className="dossier flex items-start gap-4 p-4">
            <div className="flex w-20 shrink-0 flex-col items-center gap-2 text-center text-[13px] leading-tight md:text-[16px]">
              <div className="icon-well h-20 w-20">
                <img
                  src={asset(`/bandicons/${strategy.iconLink}.png`)}
                  className="h-full w-full object-contain p-1"
                  alt=""
                />
              </div>
              <span className="font-display tracking-wide">{strategy.name}</span>
              <div className="flex items-center font-mono text-sm text-rose">
                <img src={asset("/Life_Points.webp")} className="mr-1.5 h-4 object-cover" alt="" />
                {strategy.initialHp}
              </div>
            </div>
            <RichText html={strategy.effectDesc} className="min-w-0" />
          </article>
        ))}
      </div>
    </div>
  );
};

export default StrategyList;
