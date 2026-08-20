import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { Moon, Search, Sun, Type } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { SearchModal } from "./SearchModal";
import { useTheme } from "../theme";

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [presenter, setPresenter] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`flex h-screen overflow-hidden bg-app-bg text-app-fg ${presenter ? "presenter" : ""}`}>
      <aside className="hidden h-full w-[17.5rem] shrink-0 overflow-y-auto border-r border-app-border bg-app-surface px-5 py-6 lg:block">
        <Link to="/" className="mb-1 block text-[15px] font-semibold tracking-tight text-app-fg">
          Garry TJ Robo Journey
        </Link>
        <p className="mb-6 text-xs leading-relaxed text-app-faint">FANUC HandlingTool · educational · local</p>
        <Sidebar />
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-app-border bg-app-surface/90 px-5 py-3 backdrop-blur">
          <Link to="/" className="font-medium lg:hidden">
            Garry TJ Robo Journey
          </Link>
          <div className="flex flex-1 justify-end gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-app-border px-3 py-1.5 text-sm text-app-muted hover:bg-app-hover"
            >
              <Search className="h-4 w-4" />
              Search
              <kbd className="hidden rounded bg-app-code px-1.5 text-xs sm:inline">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-lg border border-app-border px-3 py-1.5 text-sm text-app-muted hover:bg-app-hover"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <button
              type="button"
              onClick={() => setPresenter((p) => !p)}
              className="inline-flex items-center gap-2 rounded-lg border border-app-border px-3 py-1.5 text-sm text-app-muted hover:bg-app-hover"
              aria-pressed={presenter}
            >
              <Type className="h-4 w-4" />
              Presenter
            </button>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto px-5 py-8 lg:px-12">
          <Outlet />
        </main>
        <footer className="shrink-0 border-t border-app-border bg-app-surface px-5 py-3 text-xs leading-relaxed text-app-faint">
          FANUC retains all rights in its trademarks, software, and manuals. Garry TJ Robo Journey is an independent study guide — not an official FANUC product. Educational use at your own consent and risk. See LEGAL.md. Path board is a study sketch, not OEM simulation.
        </footer>
      </div>
      {searchOpen ? <SearchModal onClose={() => setSearchOpen(false)} /> : null}
    </div>
  );
}
