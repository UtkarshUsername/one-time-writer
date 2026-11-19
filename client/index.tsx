import { useState } from "preact/hooks";
import { ThemeToggle, useTheme } from "./theme";

const characterSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const wordSegmenter = new Intl.Segmenter(undefined, { granularity: "word" });

function countCharacters(value: string): number {
  let count = 0;
  for (const _segment of characterSegmenter.segment(value)) {
    count++;
  }
  return count;
}

function countWords(value: string): number {
  let count = 0;
  for (const segment of wordSegmenter.segment(value)) {
    if (segment.isWordLike) {
      count++;
    }
  }
  return count;
}

export function App() {
  const { theme, setTheme } = useTheme();
  const [text, setText] = useState("");

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

        <p className="mb-4 text-sm text-neutral-500">
          Nothing here is saved. Leave, refresh, or close the tab and it is gone.
        </p>

        <div>
          <textarea
            aria-label="Writing area"
            className="min-h-[60vh] w-full flex-1 resize-none border border-neutral-200 bg-transparent
              p-6 text-base leading-relaxed outline-none placeholder:text-neutral-400 focus:border-black
              group-data-[theme=dark]:border-neutral-800 group-data-[theme=dark]:placeholder:text-neutral-600
              group-data-[theme=dark]:focus:border-white"
            placeholder="Write whatever you want"
            value={text}
            onInput={(event) => setText((event.target as HTMLTextAreaElement).value)}
          />
        </div>

        <footer className="mt-6 flex items-center justify-between gap-4">
          <span className="text-xs text-neutral-500">
            {countWords(text)} words · {countCharacters(text)} characters
          </span>
        </footer>
      </div>
    </main>
  );
}
