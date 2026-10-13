import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Line,
} from 'recharts';
import API from '@app/services/api';
import { chatModes } from '@app/content/chat-modes';

interface ChartData {
  cumulativeUsers: { _id: string; cumulative: number; count: number }[];
  answers: { _id: string; cumulative: number }[];
  countUsers: number;
  countAnswers: number;
  answersPerUser: { name: string; totalUsers: number }[];
  answersPerUserAverage: number;
  answersPerUserMedian: number;
  answersPerUserPerDay: unknown[];
  answersPerTheme: { name: string; value: number }[];
  usersPerHour: { _id: string; count: number; cumulative: number; today: number }[];
  today: number;
  projection: number;
  maxUsersOnADay: number;
  usersPerPlatform: { name: string; count: number }[];
  platformSince: string | null;
  chats: {
    total: ChatTotals;
    perMode: (ChatTotals & { name: string })[];
    perDay: ({ _id: string } & Record<string, number | string>)[];
  };
}

interface ChatTotals {
  chats: number;
  costEur: number;
}

const CHAT_MODE_COLORS: Record<string, string> = {
  president: '#facc15',
  convaincre: '#6faea6',
  'contre-moi-meme': '#111827',
};

const chatModeTitle = (mode: string) => chatModes.find((m) => m.mode === mode)?.title ?? mode;

const formatEur = (value: number) => value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

const PLATFORMS: Record<string, string> = {
  ios: 'App iOS',
  android: 'App Android',
  'web-mobile': 'Web mobile',
  'web-desktop': 'Web ordinateur',
  'web-tablet': 'Web tablette',
};

const CustomizedAxisTick = ({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) => (
  <g transform={`translate(${x},${y}) scale(0.7)`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
      {payload?.value}
    </text>
  </g>
);

export default function Stats() {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    API.get({ path: '/public/charts' }).then((res) => {
      if (res.ok) setData(res.data);
    });
  }, []);

  if (!data) return <div className="p-12 text-center">Chargement...</div>;

  return (
    <div className="overflow-y-auto lg:h-[calc(100vh-80px)] max-lg:h-[calc(100vh-60px)]">
      <h2 className="mx-12 mt-12 max-lg:mx-4 max-lg:mt-8">Nombre cumulé d'utilisateurs: {data.countUsers}</h2>
      <span className="mx-12 max-lg:block max-lg:mx-4">Aujourd'hui: {data.today}</span>
      <span className="mx-12 max-lg:block max-lg:mx-4">Projection: {data.projection}</span>
      <span className="mx-12 max-lg:block max-lg:mx-4">Max: {data.maxUsersOnADay}</span>

      <div className="h-[80vh] w-full p-12 max-lg:mt-4 max-lg:h-[50vh] max-lg:p-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.cumulativeUsers.filter((c) => c._id > '2022-03-07')} margin={{ top: 10, right: 30, left: 30, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" tick={<CustomizedAxisTick />} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Area type="monotone" yAxisId="left" dataKey="cumulative" stroke="#111827" fill="#facc15" />
            <Line type="monotone" yAxisId="right" dataKey="count" stroke="#111827" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {data.platformSince && (
        <>
          <h2 className="mx-12 mt-12 max-lg:mx-4 max-lg:mt-1">
            Utilisateurs par plateforme (depuis le {new Date(data.platformSince).toLocaleDateString('fr-FR')})
          </h2>
          <div className="h-[50vh] w-full p-12 max-lg:mt-4 max-lg:h-[40vh] max-lg:p-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.usersPerPlatform.map((p) => ({ ...p, name: PLATFORMS[p.name] ?? p.name }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Utilisateurs" stroke="#111827" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      <h2 className="mx-12 mt-12 max-lg:mx-4 max-lg:mt-1">Utilisateurs par heure</h2>
      <div className="h-[80vh] w-full p-12 max-lg:mt-4 max-lg:h-[50vh] max-lg:p-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.usersPerHour} margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="_id" tick={<CustomizedAxisTick />} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Area type="monotone" yAxisId="left" dataKey="cumulative" fill="#facc15" stroke="#facc15" />
            <Bar dataKey="count" yAxisId="right" barSize={20} fill="#6faea6" stroke="#111827" />
            <Line type="monotone" dataKey="today" stroke="#111827" yAxisId="left" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <h2 className="mx-12 mt-12 max-lg:mx-4 max-lg:mt-1">Nombre cumulé de réponses: {data.countAnswers}</h2>
      <div className="h-[80vh] w-full p-12 max-lg:mt-4 max-lg:h-[50vh] max-lg:p-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.answers} margin={{ top: 10, right: 30, left: 30, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="cumulative" stroke="#111827" fill="#facc15" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <h2 className="mx-12 mt-12 max-lg:mx-4 max-lg:mt-1">Popularité des thèmes</h2>
      <div className="h-[80vh] w-full p-12 max-lg:mt-4 max-lg:h-[50vh] max-lg:p-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.answersPerTheme} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" stroke="#111827" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="mx-12 mt-12 max-lg:mx-4 max-lg:mt-1">Conversations avec l'IA : {data.chats.total.chats}</h2>
      <span className="mx-12 max-lg:block max-lg:mx-4">Coût : {formatEur(data.chats.total.costEur)}</span>
      <div className="mx-12 mt-6 overflow-x-auto max-lg:mx-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 pr-4">Type de conversation</th>
              <th className="py-2 pr-4 text-right">Conversations</th>
              <th className="py-2 text-right">Coût</th>
            </tr>
          </thead>
          <tbody>
            {data.chats.perMode.map((m) => (
              <tr key={m.name} className="border-b border-gray-100">
                <td className="py-2 pr-4">{chatModeTitle(m.name)}</td>
                <td className="py-2 pr-4 text-right">{m.chats}</td>
                <td className="py-2 text-right">{formatEur(m.costEur)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-[50vh] w-full p-12 max-lg:mt-4 max-lg:h-[40vh] max-lg:p-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.chats.perDay} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" tick={<CustomizedAxisTick />} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            {chatModes.map((m) => (
              <Bar key={m.mode} dataKey={m.mode} name={m.title} stackId="chats" fill={CHAT_MODE_COLORS[m.mode]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="mx-12 mt-12 max-lg:mx-4 max-lg:mt-1">
        Nombre de réponses par utilisateur : moyenne {data.answersPerUserAverage}, médiane {data.answersPerUserMedian}
      </h2>
      <div className="h-[80vh] w-full p-12 max-lg:mt-4 max-lg:h-[50vh] max-lg:p-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.answersPerUser} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalUsers" stroke="#111827" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
