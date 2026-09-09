import { FaExclamation } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

interface AnnouncementBarProps {
  visible: boolean;
  onClose: () => void;
}

export default function AnnouncementBar({ visible, onClose }: AnnouncementBarProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-60 flex h-10 items-center border-b border-copper/40 bg-copper/15 text-paper backdrop-blur-md">
      <div className="relative flex h-full flex-1 items-center overflow-hidden">
        <div className="marquee-track flex h-full items-center whitespace-nowrap will-change-transform">
          {[0, 1].map((i) => (
            <span key={i} className="flex items-center gap-6 pr-6 font-mono text-[12px] tracking-[0.18em] uppercase">
              <FaExclamation className="shrink-0 text-ember" />
              <span>
                Notice — Arknights Stronghold Protocol Archive will be moving to a new domain soon.
                The current address is{" "}
                <a
                  href="https://ak-spa.lewee.site"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-ember underline decoration-ember/50 underline-offset-2"
                >
                  ak-spa.lewee.site
                </a>
                . Bookmark this page and watch for the new address.
              </span>
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss announcement"
        className="flex h-full w-10 shrink-0 items-center justify-center border-l border-copper/40 text-paper transition-colors hover:bg-copper hover:text-ink"
      >
        <AiOutlineClose />
      </button>
    </div>
  );
}
