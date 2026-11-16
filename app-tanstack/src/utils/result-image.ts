import { candidateThumb } from '@app/utils/seo-light';

export interface ResultImageRow {
  pseudo: string;
  picture?: string | null;
  color?: string | null;
  percent: number;
  rank: number;
}

const WIDTH = 1080;
const HEIGHT = 1350;
const MAX_ROWS = 8;
const DARK = '#111827';
const YELLOW = '#facc15';

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const fitText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let cut = text;
  while (cut.length > 1 && ctx.measureText(`${cut}…`).width > maxWidth) cut = cut.slice(0, -1);
  return `${cut}…`;
};

/** Draws the shareable ranking (4:5, the feed format of Instagram, X, Facebook) and returns it as a PNG blob. */
export async function drawResultImage(rows: ResultImageRow[], answersCount: number): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const serif = 'Merriweather, Georgia, serif';
  const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  await document.fonts?.load(`bold 56px Merriweather`).catch(() => undefined);

  ctx.fillStyle = '#f9fafb';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = DARK;
  ctx.fillRect(0, 0, WIDTH, 220);
  ctx.fillStyle = YELLOW;
  ctx.fillRect(0, 214, WIDTH, 6);

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 60px ${serif}`;
  ctx.fillText('Le Quizz du Berger', 64, 110);
  ctx.fillStyle = YELLOW;
  ctx.font = `500 34px ${sans}`;
  ctx.fillText('Mes affinités politiques · Présidentielle 2027', 64, 168);

  ctx.fillStyle = '#6b7280';
  ctx.font = `500 26px ${sans}`;
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  ctx.fillText(`CLASSEMENT · ${answersCount} question${answersCount > 1 ? 's' : ''} répondue${answersCount > 1 ? 's' : ''}`, 64, 280);
  ctx.textAlign = 'right';
  ctx.fillText(date, WIDTH - 64, 280);
  ctx.textAlign = 'left';

  const shown = rows.slice(0, MAX_ROWS);
  const pictures = await Promise.all(shown.map((r) => (r.picture ? loadImage(candidateThumb(r.picture)) : null)));

  const rowHeight = 100;
  const top = 312;
  shown.forEach((row, i) => {
    const y = top + i * (rowHeight + 10);
    const color = row.color || '#9ca3af';
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, 48, y, WIDTH - 96, rowHeight, 22);
    ctx.fill();
    ctx.strokeStyle = `${color}66`;
    ctx.lineWidth = 3;
    ctx.stroke();

    const cy = y + rowHeight / 2;
    ctx.fillStyle = i < 3 ? ['#facc15', '#cbd5e1', '#d6a067'][i] : '#f3f4f6';
    ctx.beginPath();
    ctx.arc(100, cy, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = DARK;
    ctx.font = `bold 28px ${sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(String(row.rank), 100, cy + 10);
    ctx.textAlign = 'left';

    const ax = 178;
    const r = 34;
    ctx.save();
    ctx.beginPath();
    ctx.arc(ax, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.clip();
    const pic = pictures[i];
    if (pic) {
      const size = Math.min(pic.width, pic.height);
      ctx.drawImage(pic, (pic.width - size) / 2, 0, size, size, ax - r, cy - r, r * 2, r * 2);
    }
    ctx.restore();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(ax, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = DARK;
    ctx.font = `600 34px ${sans}`;
    ctx.fillText(fitText(ctx, row.pseudo, 360), 236, cy + 12);

    const barX = 620;
    const barW = 260;
    ctx.fillStyle = '#f3f4f6';
    roundRect(ctx, barX, cy - 9, barW, 18, 9);
    ctx.fill();
    ctx.fillStyle = color;
    roundRect(ctx, barX, cy - 9, Math.max((barW * row.percent) / 100, 18), 18, 9);
    ctx.fill();

    ctx.fillStyle = DARK;
    ctx.font = `bold 36px ${sans}`;
    ctx.textAlign = 'right';
    ctx.fillText(`${row.percent}%`, WIDTH - 72, cy + 13);
    ctx.textAlign = 'left';
  });

  ctx.fillStyle = DARK;
  ctx.fillRect(0, HEIGHT - 110, WIDTH, 110);
  ctx.fillStyle = '#ffffff';
  ctx.font = `500 32px ${sans}`;
  ctx.textAlign = 'center';
  ctx.fillText('Et vous, de qui êtes-vous proche ?', WIDTH / 2, HEIGHT - 62);
  ctx.fillStyle = YELLOW;
  ctx.font = `bold 30px ${sans}`;
  ctx.fillText('quizz-du-berger.com', WIDTH / 2, HEIGHT - 24);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
