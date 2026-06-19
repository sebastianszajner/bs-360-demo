// Minimalistyczne ikony ról i statusów do panelu badania.
// Czyste SVG line-art (UI aplikacji, nie materiał szkoleniowy) — spójna rodzina 24×24.
import type { RoleKey } from '../../data/modelConfig';

const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function RoleIcon({ role, color = '#1c2b3a' }: { role: RoleKey; color?: string }) {
  const s = { ...base, stroke: color };
  switch (role) {
    case 'sam': // samoocena — osoba odbita w lustrze (świadomość siebie)
      return (
        <svg {...s}><circle cx="12" cy="8" r="3.2" /><path d="M6 19c0-3 2.7-5 6-5s6 2 6 5" /><path d="M12 4.5v15" strokeDasharray="1.5 2" opacity="0.5" /></svg>
      );
    case 'prz': // przełożony — osoba ze strzałką hierarchii w górę
      return (
        <svg {...s}><circle cx="12" cy="9" r="3.2" /><path d="M6.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M12 6.5 12 2M9.8 4 12 1.8 14.2 4" /></svg>
      );
    case 'wsp': // współpracownicy — dwie osoby obok siebie
      return (
        <svg {...s}><circle cx="8.5" cy="9" r="2.6" /><circle cx="15.5" cy="9" r="2.6" /><path d="M4 19c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M15 19c0-2.5 2-4 4.5-4" /></svg>
      );
    case 'pod': // podwładni — osoba nad grupą (zespół pod spodem)
      return (
        <svg {...s}><circle cx="12" cy="6.5" r="2.6" /><path d="M7.5 13c0-2.2 2-3.6 4.5-3.6s4.5 1.4 4.5 3.6" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M3.5 23c0-1.8 1.5-3 3.5-3M13.5 23c0-1.8 1.5-3 3.5-3" /></svg>
      );
  }
}

export function StatusIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#00d084" /><path d="M8 12.5 11 15.5 16.5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    );
  }
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="none" stroke="#cbbf8f" strokeWidth="1.6" strokeDasharray="2.5 2.5" /><path d="M12 7.5V12l3 1.8" stroke="#b08e2e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}
