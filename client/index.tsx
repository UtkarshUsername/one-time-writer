import { ThemeToggle, useTheme } from "./theme";
import { Writer } from "./writer";

export function App() {
  const { theme, setTheme } = useTheme();

  return (
    <main
      data-theme={theme}
      className="group flex min-h-screen bg-white px-6 py-8 text-neutral-900
        selection:bg-amber-300 selection:text-black data-[theme=dark]:bg-black data-[theme=dark]:text-neutral-100"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <header className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">One Time Writer</h1>
          <ThemeToggle theme={theme} onChange={setTheme} />
        </header>
        <Writer />
      </div>
    </main>
  );
}
