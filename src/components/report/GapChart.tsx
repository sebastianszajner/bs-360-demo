import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { CompetencyScore } from '../../engine/scorer';
import { COMPETENCIES, ROLE_COLORS, ROLES, type RoleKey } from '../../data/model';

interface Props {
  competencies: CompetencyScore[];
}

const ROLES_TO_SHOW: RoleKey[] = ['sam', 'prz', 'wsp', 'pod'];

export default function GapChart({ competencies }: Props) {
  const shortNames = Object.fromEntries(COMPETENCIES.map((c) => [c.id, c.nameShort]));
  const data = competencies.map((c) => ({
    name: shortNames[c.id] ?? c.id,
    ...Object.fromEntries(ROLES_TO_SHOW.map((r) => [r, +c.avgByRole[r].toFixed(2)])),
    gap: +(c.gap).toFixed(2),
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} barCategoryGap="22%" barGap={1} margin={{ bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 9, fill: '#666' }}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={50}
        />
        <YAxis domain={[0, 6]} tick={{ fontSize: 10, fill: '#666' }} />
        <Tooltip
          formatter={(value, name) => [
            typeof value === 'number' ? value.toFixed(2) : value,
            ROLES[name as RoleKey] ?? name,
          ]}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#555', fontSize: '11px' }}>
              {ROLES[value as RoleKey] ?? value}
            </span>
          )}
        />
        {ROLES_TO_SHOW.map((role) => (
          <Bar key={role} dataKey={role} fill={ROLE_COLORS[role]} radius={[3, 3, 0, 0]}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={ROLE_COLORS[role]} />
            ))}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
