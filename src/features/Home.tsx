import { FaGithub, FaTwitter, FaFacebook, FaDiscord } from "react-icons/fa";
import { asset } from "../utils/asset";

type HomeProps = {
  onOpenTab: (tab: string) => void;
};

const SECTIONS = [
  { tab: "Attributes", kicker: "01", title: "Operators", copy: "Tiers, alliances, and combat attributes." },
  { tab: "Alliances", kicker: "02", title: "Bonds", copy: "Activation counts and field-wide effects." },
  { tab: "Strategies", kicker: "03", title: "Openers", copy: "Starting HP and opening doctrines." },
  { tab: "Items", kicker: "04", title: "Depot", copy: "Shop kits and Damazti imprints." },
];

export default function Home({ onOpenTab }: HomeProps) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-8 md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-8 md:py-14">
      <div className="order-2 flex flex-col gap-6 md:order-1">
        <p className="rise font-mono text-[11px] tracking-[0.32em] text-copper uppercase">
          Field archive · EN community
        </p>
        <h1 className="rise font-display text-5xl leading-[0.9] tracking-tight text-paper md:text-7xl" style={{ animationDelay: "60ms" }}>
          Stronghold
          <span className="block text-copper">Protocol</span>
          Archive
        </h1>
        <p className="rise max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: "120ms" }}>
          Operator attributes, alliances, strategies, and shop kits for Stronghold Protocol
          seasons — compiled for the EN community. CN-only lines are marked as tentative
          until official copy lands.
        </p>
        <p className="rise max-w-xl text-base leading-relaxed text-muted" style={{ animationDelay: "160ms" }}>
          Data is cross-checked against PRTS and the AK Terra Wiki. If something is wrong
          (bug, mistranslation, missing operator), ping the maintainer below.
        </p>
        <div className="rise grid grid-cols-2 gap-2 sm:grid-cols-4" style={{ animationDelay: "200ms" }}>
          {SECTIONS.map((section) => (
            <button
              key={section.tab}
              onClick={() => onOpenTab(section.tab)}
              className="dossier p-3 text-left transition-colors hover:border-copper"
            >
              <span className="font-mono text-[10px] tracking-[0.22em] text-copper">{section.kicker}</span>
              <div className="font-display text-xl tracking-wide text-paper">{section.title}</div>
              <p className="mt-1 text-[12px] leading-snug text-muted">{section.copy}</p>
            </button>
          ))}
        </div>
        <div className="rise flex gap-3" style={{ animationDelay: "240ms" }}>
          {[
            {
              href: "https://github.com/mlewee/ak-spa",
              icon: FaGithub,
              label: "GitHub",
            },
            { href: "https://x.com/Lewee22", icon: FaTwitter, label: "Twitter" },
            {
              href: "https://www.facebook.com/mlewee/",
              icon: FaFacebook,
              label: "Facebook",
            },
            { href: "https://discordapp.com/users/241553409872887809/", icon: FaDiscord, label: "Discord" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center border border-line bg-panel text-paper transition-colors hover:border-copper hover:text-ember"
            >
              <Icon />
            </a>
          ))}
        </div>
        <aside className="dossier rise mt-2 p-5 md:p-6" style={{ animationDelay: "280ms" }}>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl tracking-wide text-ember">Dispatch log</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              latest
            </span>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-paper/90">
            <li className="border-l-2 border-copper pl-3">
              Updated Second Season descriptions to match the EN translation.
            </li>
            <li className="border-l-2 border-line pl-3">
              Added a tooltip for Operator Attribute on the Alliance page.
            </li>
          </ul>
        </aside>
        <p className="rise text-xs text-muted" style={{ animationDelay: "320ms" }}>
          Inspired by and data sourced from{" "}
          <a
            href="https://github.com/anhnt20112003/stronghold-protocol-alliance-database"
            target="_blank"
            rel="noreferrer"
            className="underline transition-colors hover:text-copper"
          >
            stronghold-protocol-alliance-database
          </a>
        </p>
      </div>

      <div className="rise order-1 relative mx-auto w-full max-w-sm md:order-2 md:max-w-none" style={{ animationDelay: "80ms" }}>
        <div className="absolute -left-3 top-6 hidden h-[calc(100%-3rem)] w-px bg-copper/50 md:block" />
        <div className="dossier overflow-hidden p-3">
          <div className="relative aspect-square overflow-hidden bg-ink">
            <img
              src={asset("/kelsey.png")}
              alt="Kal'tsit surrounded by field manuals"
              className="h-full w-full object-contain"
            />
            <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
              Cat. 03 · Kelsey
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
