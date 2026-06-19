import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { CompetencyScore } from '../../engine/scorer';
import { COMPETENCIES, ROLE_COLORS, ROLES, type RoleKey } from '../../data/model';

interface Props {
  competencies: CompetencyScore[];
}

const ROLES_TO_SHOW: RoleKey[] = ['sam', 'prz', 'wsp', 'pod'];

export default function RadarChartComponent({ competencies }: Props) {
  const shortNames = Object.fromEntries(COMPETENCIES.map((c) => [c.id, c.nameShort]));
  const data = competencies.map((c) => ({
    subject: shortNames[c.id] ?? c.name,
    ...Object.fromEntries(ROLES_TO_SHOW.map((r) => [r, +c.avgByRole[r].toFixed(2)])),
  }));

  return (
    <ResponsiveContainer width="100%" height={380}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarRadiusAxis angle={90} domain={[0, 6]} tick={{ fontSize: 9, fill: '#aaa' }} tickCount={4} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 10, fill: '#555', fontWeight: 500 }}
        />
        <Tooltip
          formatter={(value, name) => [
            typeof value === 'number' ? value.toFixed(2) : value,
            ROLES[name as RoleKey] ?? name,
          ]}
        />
        {ROLES_TO_SHOW.map((role) => (
          <Radar
            key={role}
            name={ROLES[role]}
            dataKey={role}
            stroke={ROLE_COLORS[role]}
            fill={ROLE_COLORS[role]}
            fillOpacity={0.08}
            strokeWidth={2}
          />
        ))}
        <Legend
          formatter={(value) => (
            <span style={{ color: '#555', fontSize: '11px' }}>
              {ROLES[value as RoleKey] ?? value}
            </span>
          )}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
