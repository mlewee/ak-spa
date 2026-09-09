import Select from "./Select";
import { SEASON_OPTIONS, TABS } from "../constants";

interface HeaderProps {
  currentPage: string;
  currentSeason: string;
  switchTab: (tab: string) => void;
  switchSeason: (season: string) => void;
  topOffset?: string;
}

const HeaderDesktop = (props: HeaderProps) => {
  const { currentPage, currentSeason, switchTab, switchSeason, topOffset = "0rem" } = props;

  return (
    <header
      className="copper-rail fixed top-0 z-50 hidden h-16 w-full items-center justify-between border-b border-line/80 bg-ink/85 px-6 backdrop-blur-md md:flex"
      style={{ top: topOffset }}
    >
      <div className="flex items-baseline gap-3">
        <div className="font-display text-3xl tracking-wide text-paper">Arknights Stronghold Protocol Alliance</div>
        {/* <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Archive · Silverglow
        </div> */}
      </div>

      <nav className="flex h-full items-stretch gap-1">
        {currentPage !== "Home" && (
          <div className="flex items-center pr-3">
            <Select options={SEASON_OPTIONS} value={currentSeason} onChange={switchSeason} />
          </div>
        )}
        {TABS.map((tab) => {
          const active = tab === currentPage;
          return (
            <button
              key={tab}
              className={`relative px-3 font-display text-lg tracking-wide transition-colors ${
                active ? "text-ember" : "text-muted hover:text-paper"
              }`}
              onClick={() => {
                if (tab !== currentPage) switchTab(tab);
              }}
            >
              {tab}
              {active && (
                <span className="absolute inset-x-2 bottom-0 h-0.5 bg-copper" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default HeaderDesktop;
