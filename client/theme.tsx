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
    // Browser settings can block access to localStorage.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage writes can fail even after a successful read.
    }
  }, [theme]);

  return { theme, setTheme };
}

export function ThemeToggle({ theme, onChange }: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      aria-label={`Switch to ${nextTheme} mode`}
      className="flex h-8 w-8 items-center justify-center text-neutral-700
        hover:opacity-80 group-data-[theme=dark]/theme:text-neutral-300"
      onClick={() => onChange(nextTheme)}
      type="button"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {nextTheme === "light" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 4V2M12 22v-2M4.93 4.93l1.41 1.41M19.07 4.93l-1.41 1.41M2 12h2M22 12h-2M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
