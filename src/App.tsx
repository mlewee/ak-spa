import { useSearchParams } from "react-router-dom";
import { AiOutlineUp } from "react-icons/ai";
import AttributeList from "./features/AttributeList";
import AllianceList from "./features/AllianceList";
import StrategyList from "./features/StrategyList";
import ShopItemList from "./features/ShopItemList";
import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";
import Home from "./features/Home";
import { SEASONS, TABS } from "./constants";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const season = searchParams.get("season");
  const currentSeason = season && (SEASONS as readonly string[]).includes(season) ? season : "2.1";

  const page = searchParams.get("tab");
  const currentPage = page && (TABS as readonly string[]).includes(page) ? page : "Home";

  const switchTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    setSearchParams(params, { replace: true });
  };

  const switchSeason = (nextSeason: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("season", nextSeason);
    setSearchParams(params, { replace: true });
  };

  return (
    <>
      <HeaderDesktop
        currentPage={currentPage}
        currentSeason={currentSeason}
        switchTab={switchTab}
        switchSeason={switchSeason}
      />
      <HeaderMobile
        currentPage={currentPage}
        currentSeason={currentSeason}
        switchTab={switchTab}
        switchSeason={switchSeason}
      />
      <div className="app-shell relative w-full min-h-screen">
        <main className="w-full flex flex-col pt-16 pb-16">
          {currentPage === "Home" && <Home onOpenTab={switchTab} />}
          {currentPage === "Attributes" && <AttributeList season={currentSeason} />}
          {currentPage === "Alliances" && <AllianceList season={currentSeason} />}
          {currentPage === "Strategies" && <StrategyList season={currentSeason} />}
          {currentPage === "Items" && <ShopItemList season={currentSeason} />}
        </main>
        {currentPage !== "Home" && (
          <button
            className="fixed bottom-5 right-5 z-20 h-11 w-11 border border-copper bg-panel text-ember shadow-[0_0_24px_rgba(208,138,58,0.25)] hover:bg-copper hover:text-ink transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <AiOutlineUp className="mx-auto" />
          </button>
        )}
      </div>
    </>
  );
}

export default App;
