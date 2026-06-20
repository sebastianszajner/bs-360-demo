import { useState } from 'react';

// Chmurka z podpowiedzią — ikona „?" z dymkiem na hover/focus.
// Wyjaśnia element bez zaśmiecania widoku (brief: chmurka z podpowiedzią dla użytkownika).
export default function Hint({ text, color = '#7a00df' }: { text: string; color?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex no-print">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-label="Podpowiedź"
        className="w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 leading-none"
        style={{ background: color }}
      >?</button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-60 rounded-lg px-3 py-2 text-[12px] leading-snug text-white shadow-xl z-30"
          style={{ background: '#1c2b3a' }}
        >
          {text}
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 rotate-45" style={{ background: '#1c2b3a' }} />
        </span>
      )}
    </span>
  );
}
