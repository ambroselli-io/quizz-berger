import { useEffect, useMemo, useState } from 'react';
import { Area, CartesianGrid, ComposedChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import API from '@app/services/api';

interface Row {
  name: string;
  count: number;
}

interface AudienceData {
  from: string;
  to: string;
  totals: { pageviews: number; visits: number; visitors: number };
  timeline: { bucket: string; pageviews: number; visits: number; visitors: number }[];
  sources: Row[];
  referrers: Row[];
  campaigns: Row[];
  entryPages: Row[];
  pages: Row[];
  devices: Row[];
  bots: {
    categories: Row[];
    bots: (Row & { category: string })[];
    timeline: { bucket: string; category: string; count: number }[];
    pages: (Row & { missing: boolean })[];
  };
}

const BOT_CATEGORIES: Record<string, { label: string; color: string }> = {
  'ai-answer': { label: 'Réponses IA', color: '#111827' },
  indexing: { label: 'Indexation', color: '#3b82f6' },
  training: { label: 'Entraînement', color: '#f97316' },
  preview: { label: 'Aperçus de lien', color: '#22c55e' },
  other: { label: 'Autres', color: '#9ca3af' },
};

const DEVICES: Record<string, string> = { mobile: 'Mobile', desktop: 'Ordinateur', tablet: 'Tablette' };

const parisDay = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Paris' });
const daysAgo = (days: number) => parisDay.format(new Date(Date.now() - days * 24 * 3600 * 1000));

const PRESETS = [
  { label: "Aujourd'hui", days: 0 },
  { label: 'Hier', days: 1, single: true },
  { label: '7 jours', days: 6 },
  { label: '30 jours', days: 29 },
  { label: '90 jours', days: 89 },
  { label: '1 an', days: 364 },
];

const formatCount = (n: number) => n.toLocaleString('fr-FR');

const decodePath = (path: string) => {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
};

// Crawlers spend much of their time on URLs nobody reads: 404s and /all-questions/{pseudo}, whose
// pseudo is often a spam search query (the page is noindex).
const isNoisePath = (row: { name: string; missing: boolean }) => row.missing || /^\/all-questions\/./.test(row.name);

function RankedList({ rows, onPick, render }: { rows: Row[]; onPick?: (name: string) => void; render?: (name: string) => React.ReactNode }) {
  if (!rows.length) return <p className="py-6 text-center text-sm text-gray-400">Aucune donnée</p>;
  const max = Math.max(...rows.map((r) => r.count));
  return (
    <ul className="flex flex-col gap-1">
      {rows.map((row) => (
        <li key={row.name} className="relative">
          <div className="absolute inset-y-0 left-0 rounded bg-quizz-yellow/25" style={{ width: `${(row.count / max) * 100}%` }} />
          <div
            className={`relative flex items-center justify-between gap-4 px-2 py-1.5 text-sm ${onPick ? 'cursor-pointer hover:underline' : ''}`}
            onClick={onPick ? () => onPick(row.name) : undefined}
          >
            <span className="min-w-0 break-all">{render ? render(row.name) : row.name}</span>
            <span className="shrink-0 tabular-nums">{formatCount(row.count)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Card<T extends string>({ tabs, children }: { tabs: Record<T, string>; children: (tab: T) => React.ReactNode }) {
  const keys = Object.keys(tabs) as T[];
  const [tab, setTab] = useState<T>(keys[0]);
  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-xl border border-gray-200 p-4">
      <div className="flex flex-wrap gap-1">
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-full px-3 py-1 text-sm ${tab === key ? 'bg-quizz-dark text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            {tabs[key]}
          </button>
        ))}
      </div>
      <div className="max-h-[28rem] overflow-y-auto">{children(tab)}</div>
    </section>
  );
}

function Tile({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {color && <span className="size-2.5 rounded-full" style={{ background: color }} />}
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{formatCount(value)}</div>
    </div>
  );
}

export default function Audience() {
  const [from, setFrom] = useState(daysAgo(29));
  const [to, setTo] = useState(daysAgo(0));
  const [source, setSource] = useState<string | null>(null);
  const [path, setPath] = useState<string | null>(null);
  const [hideBotNoise, setHideBotNoise] = useState(true);
  const [data, setData] = useState<AudienceData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'forbidden'>('loading');

  useEffect(() => {
    const query: Record<string, string> = { from, to };
    if (source) query.source = source;
    if (path) query.path = path;
    API.get({ path: '/visit/stats', query }).then((res) => {
      if (res?.ok) {
        setData(res.data);
        setStatus('ok');
      } else {
        setStatus('forbidden');
      }
    });
  }, [from, to, source, path]);

  const botTimeline = useMemo(() => {
    const byBucket = new Map<string, Record<string, string | number>>();
    for (const row of data?.bots.timeline ?? []) {
      const point = byBucket.get(row.bucket) ?? { bucket: row.bucket };
      point[row.category] = row.count;
      byBucket.set(row.bucket, point);
    }
    return [...byBucket.values()];
  }, [data]);

  if (status === 'forbidden') {
    return <div className="p-12 text-center">Page réservée aux administrateurs : connectez-vous avec un compte admin.</div>;
  }
  if (!data) return <div className="p-12 text-center">Chargement...</div>;

  const botCount = (category: string) => data.bots.categories.find((c) => c.name === category)?.count ?? 0;

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-8 max-lg:p-4">
        <header className="flex flex-col gap-3">
          <h1 className="font-[Merriweather] text-2xl font-bold">Audience</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setFrom(daysAgo(preset.days));
                  setTo(daysAgo(preset.single ? preset.days : 0));
                }}
                className="rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-100"
              >
                {preset.label}
              </button>
            ))}
            <input type="date" value={from} max={to} onChange={(e) => e.target.value && setFrom(e.target.value)} className="rounded border border-gray-200 px-2 py-1" />
            <span>→</span>
            <input type="date" value={to} min={from} onChange={(e) => e.target.value && setTo(e.target.value)} className="rounded border border-gray-200 px-2 py-1" />
          </div>
          {(source || path) && (
            <div className="flex flex-wrap gap-2 text-sm">
              {source && (
                <button type="button" onClick={() => setSource(null)} className="rounded-full bg-quizz-yellow px-3 py-1">
                  Source : {source} ✕
                </button>
              )}
              {path && (
                <button type="button" onClick={() => setPath(null)} className="rounded-full bg-quizz-yellow px-3 py-1">
                  Page : {path} ✕
                </button>
              )}
            </div>
          )}
        </header>

        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
          <Tile label="Visiteurs" value={data.totals.visitors} />
          <Tile label="Visites" value={data.totals.visits} />
          <Tile label="Pages vues" value={data.totals.pageviews} />
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {/* Page views run ~20× visitors: each gets its own axis, otherwise visitors flatten at zero. */}
            <ComposedChart data={data.timeline} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="bucket" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="visitors" allowDecimals={false} tick={{ fontSize: 12, fill: '#111827' }} />
              <YAxis yAxisId="pageviews" orientation="right" allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip />
              <Legend />
              <Area yAxisId="visitors" type="monotone" dataKey="visitors" name="Visiteurs (axe gauche)" stroke="#111827" fill="#facc15" fillOpacity={0.5} />
              <Line yAxisId="pageviews" type="monotone" dataKey="pageviews" name="Pages vues (axe droit)" stroke="#6b7280" strokeDasharray="4 3" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          <Card tabs={{ sources: 'Sources', referrers: 'Referrers', campaigns: 'Campagnes' }}>
            {(tab) =>
              tab === 'sources' ? (
                <RankedList rows={data.sources} onPick={setSource} />
              ) : tab === 'referrers' ? (
                <RankedList
                  rows={data.referrers}
                  render={(url) => (
                    <a href={url} target="_blank" rel="noreferrer noopener" onClick={(e) => e.stopPropagation()}>
                      {url}
                    </a>
                  )}
                />
              ) : (
                <RankedList rows={data.campaigns} />
              )
            }
          </Card>
          <Card tabs={{ entry: "Pages d'entrée", pages: 'Pages', devices: 'Appareils' }}>
            {(tab) =>
              tab === 'entry' ? (
                <RankedList rows={data.entryPages} onPick={setPath} render={decodePath} />
              ) : tab === 'pages' ? (
                <RankedList rows={data.pages} onPick={setPath} render={decodePath} />
              ) : (
                <RankedList rows={data.devices} render={(name) => DEVICES[name] ?? name} />
              )
            }
          </Card>
        </div>

        <h2 className="mt-6 font-[Merriweather] text-xl font-bold">Robots</h2>
        <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-2">
          {Object.entries(BOT_CATEGORIES).map(([key, { label, color }]) => (
            <Tile key={key} label={label} value={botCount(key)} color={color} />
          ))}
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={botTimeline} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="bucket" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              {Object.entries(BOT_CATEGORIES).map(([key, { label, color }]) => (
                <Line key={key} type="monotone" dataKey={key} name={label} stroke={color} dot={false} connectNulls />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          <Card tabs={{ bots: 'Robots' }}>
            {() => (
              <RankedList
                rows={data.bots.bots}
                render={(name) => {
                  const category = data.bots.bots.find((b) => b.name === name)?.category ?? 'other';
                  return (
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ background: BOT_CATEGORIES[category]?.color }} />
                      {name}
                    </span>
                  );
                }}
              />
            )}
          </Card>
          <Card tabs={{ pages: 'Pages visitées par les robots' }}>
            {() => (
              <>
                <label className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <input type="checkbox" checked={hideBotNoise} onChange={(e) => setHideBotNoise(e.target.checked)} />
                  Masquer les 404 et les pages /all-questions/{'{pseudo}'}
                </label>
                <RankedList
                  rows={(hideBotNoise ? data.bots.pages.filter((row) => !isNoisePath(row)) : data.bots.pages).slice(0, 50)}
                  onPick={setPath}
                  render={decodePath}
                />
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
