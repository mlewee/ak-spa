import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Select from "./Select";
import { SEASON_OPTIONS, TABS } from "../constants";

interface HeaderProps {
  currentPage: string;
  currentSeason: string;
  switchTab: (tab: string) => void;
  switchSeason: (season: string) => void;
  topOffset?: string;
}

const HeaderMobile = (props: HeaderProps) => {
  const { currentPage, currentSeason, switchTab, switchSeason, topOffset = "0rem" } = props;
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  return (
    <>
      <header
        className="copper-rail fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-line/80 bg-ink/85 px-4 backdrop-blur-md md:hidden"
        style={{ top: topOffset }}
      >
      <div className="flex items-baseline gap-2">
        <div className="font-display text-2xl tracking-wide text-paper">AK Stronghold Protocol</div>
        {/* <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Silverglow
        </div> */}
      </div>

      <button
        className="flex h-9 w-9 items-center justify-center border border-copper bg-panel text-ember"
        onClick={() => setToggleMobileMenu((prev) => !prev)}
        aria-label={toggleMobileMenu ? "Close menu" : "Open menu"}
        aria-expanded={toggleMobileMenu}
      >
        {toggleMobileMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
      </header>

      <div
        className="fixed inset-0 z-30 bg-ink/70"
        style={{ display: toggleMobileMenu ? "block" : "none" }}
        onClick={() => setToggleMobileMenu(false)}
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 z-40 flex h-full w-56 flex-col gap-1 overflow-y-auto border-l border-line bg-panel-2 pt-16 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] transition-transform duration-300"
        style={{ transform: toggleMobileMenu ? "translateX(0)" : "translateX(100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {TABS.map((page) => {
          const active = page === currentPage;
          return (
            <button
              key={page}
              className={`w-full px-5 py-3 text-left font-display text-xl tracking-wide ${
                active ? "bg-copper/15 text-ember" : "text-paper"
              }`}
              onClick={() => {
                if (page !== currentPage) switchTab(page);
                setToggleMobileMenu(false);
              }}
            >
              {page}
            </button>
          );
        })}
        <div className="px-4 pt-4">
          <Select
            options={SEASON_OPTIONS}
            value={currentSeason}
            onChange={(season) => {
              switchSeason(season);
              setToggleMobileMenu(false);
            }}
            className="text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
