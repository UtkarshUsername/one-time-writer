import { useEffect, useState } from "preact/hooks";

const STORAGE_KEY = "one-time-writer.theme";

type Theme = "light" | "dark";

function initialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // ignore
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function OneTimeWriter() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const dark = theme === "dark";

  const page = dark
    ? "bg-black text-neutral-100"
    : "bg-white text-neutral-900";

  const chrome = dark ? "text-neutral-500" : "text-neutral-500";
  const icon = dark ? "text-neutral-300" : "text-neutral-700";
  const border = dark ? "border-neutral-800" : "border-neutral-200";
  const borderFocus = dark ? "focus:border-white" : "focus:border-black";
  const placeholder = dark ? "placeholder:text-neutral-600" : "placeholder:text-neutral-400";

  return (
    <main className={`flex min-h-screen ${page} px-6 py-8 selection:bg-amber-300 selection:text-black`}>
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <header className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">One Time Writer</h1>
          <button
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={`flex h-8 w-8 items-center justify-center ${icon} hover:opacity-80`}
            onClick={() => setTheme(dark ? "light" : "dark")}
            type="button"
          >
            {dark ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 4V2M12 22v-2M4.93 4.93l1.41 1.41M19.07 4.93l-1.41 1.41M2 12h2M22 12h-2M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </header>

        <p className={`mb-4 text-sm ${chrome}`}>
          Nothing here is saved. Leave, refresh, or close the tab and it is gone.
        </p>

        <div>
          <textarea
            className={`min-h-[60vh] w-full flex-1 resize-none border ${border} ${borderFocus} ${placeholder} bg-transparent p-6 text-base leading-relaxed outline-none`}
            placeholder="Write whatever you want"
            value={text}
            onInput={(event) => setText((event.target as HTMLTextAreaElement).value)}
          />
        </div>

        <footer className="mt-6 flex items-center justify-between gap-4">
          <span className={`text-xs ${chrome}`}>{text.length} characters</span>
        </footer>
      </div>
    </main>
  );
}

export function App() {
  return <OneTimeWriter />;
}
