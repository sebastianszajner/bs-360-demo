import { useRef } from 'react';

// Kontrolka kalibracji w dwóch trybach naraz (wzorzec z konfiguratorów e-commerce):
// 1) stepper [− wartość +] do precyzyjnego klikania góra/dół,
// 2) przeciągany slider lewo/prawo do szybkiego ustawiania.
// Oba zsynchronizowane — zmiana jednego natychmiast aktualizuje drugi.
interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  accent?: string;
  hint?: string;
  onChange: (v: number) => void;
}

export default function CalibControl({ label, value, min, max, step = 0.1, accent = '#7a00df', hint, onChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const clamp = (v: number) => Math.max(min, Math.min(max, Math.round(v / step) * step));
  const pct = ((value - min) / (max - min)) * 100;

  function setFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onChange(clamp(min + t * (max - min)));
  }
  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (e.buttons !== 1) return;
    setFromClientX(e.clientX);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">{label}</span>
        <span className="text-sm font-bold tabular-nums" style={{ color: accent }}>{value.toFixed(step < 1 ? 1 : 0)}</span>
      </div>

      {/* tryb 1 — stepper */}
      <div className="flex items-stretch rounded-lg border border-gray-200 overflow-hidden w-fit mb-2.5 select-none">
        <button
          onClick={() => onChange(clamp(value - step))}
          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:bg-gray-100 text-lg font-bold"
          aria-label="mniej"
        >−</button>
        <input
          type="number" step={step} min={min} max={max} value={value}
          onChange={(e) => onChange(clamp(+e.target.value))}
          className="w-16 text-center text-sm font-semibold border-x border-gray-200 outline-none tabular-nums"
        />
        <button
          onClick={() => onChange(clamp(value + step))}
          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:bg-gray-100 text-lg font-bold"
          aria-label="więcej"
        >+</button>
      </div>

      {/* tryb 2 — przeciągany slider */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        className="relative h-7 flex items-center cursor-pointer touch-none"
      >
        <div className="absolute left-0 right-0 h-1.5 rounded-full bg-gray-150" style={{ background: '#eceef2' }} />
        <div className="absolute left-0 h-1.5 rounded-full" style={{ width: `${pct}%`, background: accent }} />
        <div
          className="absolute w-5 h-5 rounded-full bg-white border-2 shadow-md -translate-x-1/2 transition-transform active:scale-110"
          style={{ left: `${pct}%`, borderColor: accent }}
        />
        {/* znaczniki min/max */}
        <span className="absolute left-0 -bottom-1 text-[9px] text-gray-300">{min}</span>
        <span className="absolute right-0 -bottom-1 text-[9px] text-gray-300">{max}</span>
      </div>
      {hint && <div className="text-[11px] text-gray-400 mt-2">{hint}</div>}
    </div>
  );
}
