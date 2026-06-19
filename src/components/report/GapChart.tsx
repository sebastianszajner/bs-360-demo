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
import { ROLE_COLORS, ROLES, type RoleKey } from '../../data/model';

interface Props {
  competencies: CompetencyScore[];
}

const ROLES_TO_SHOW: RoleKey[] = ['sam', 'prz', 'wsp', 'pod'];

export default function GapChart({ competencies }: Props) {
  const data = competencies.map((c) => ({
    name: c.name.replace(' operacyjnym', '').replace(' i adaptacja', '').replace(' i feedback rozwojowy', ' i feedback').replace(' i partnerstwo biznesowe', ''),
    ...Object.fromEntries(ROLES_TO_SHOW.map((r) => [r, +c.avgByRole[r].toFixed(2)])),
    gap: +(c.gap).toFixed(2),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barCategoryGap="25%" barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 9, fill: '#666' }}
          interval={0}
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
