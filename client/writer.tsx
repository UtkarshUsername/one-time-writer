import { useMemo, useState } from "preact/hooks";

const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const wordSegmenter = new Intl.Segmenter(undefined, { granularity: "word" });

function countText(text: string) {
  let words = 0;
  for (const segment of wordSegmenter.segment(text)) {
    if (segment.isWordLike) {
      words++;
    }
  }

  let characters = 0;
  for (const _segment of graphemeSegmenter.segment(text)) {
    characters++;
  }

  return { words, characters };
}

export function Writer() {
  const [text, setText] = useState("");
  const { words, characters } = useMemo(() => countText(text), [text]);

  return (
    <div>
      <p className="mb-4 text-sm text-neutral-500">
        Nothing here is saved. Leave, refresh, or close the tab and it is gone.
      </p>

      <textarea
        aria-label="Writing area"
        className="min-h-[60vh] w-full resize-none border border-neutral-200 bg-transparent
          p-6 text-base leading-relaxed outline-none placeholder:text-neutral-400 focus:border-black
          group-data-[theme=dark]:border-neutral-800 group-data-[theme=dark]:placeholder:text-neutral-600
          group-data-[theme=dark]:focus:border-white"
        placeholder="Write whatever you want"
        value={text}
        onInput={(event) => setText(event.currentTarget.value)}
      />

      <footer className="mt-6 text-xs text-neutral-500">
        {words} words · {characters} characters
      </footer>
    </div>
  );
}
