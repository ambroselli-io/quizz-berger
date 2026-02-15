import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import type { PodiumDataWithPercentAndHeightAndHighest } from "~/types/answer";

// Load fonts once at startup
const merriweatherBold = fs.readFileSync(path.resolve(__dirname, "../assets/fonts/Merriweather-Bold.ttf"));
const merriweatherSans = fs.readFileSync(path.resolve(__dirname, "../assets/fonts/MerriweatherSans-Regular.ttf"));

// Cache candidate avatar images in memory as base64 data URIs
const avatarCache = new Map<string, string>();

async function getAvatarDataUri(picturePath: string): Promise<string> {
  if (avatarCache.has(picturePath)) {
    return avatarCache.get(picturePath)!;
  }
  try {
    const url = `https://www.quizz-du-berger.com/${picturePath}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const dataUri = `data:image/png;base64,${buffer.toString("base64")}`;
    avatarCache.set(picturePath, dataUri);
    return dataUri;
  } catch (err) {
    console.error(`Failed to fetch avatar for ${picturePath}:`, err);
    return "";
  }
}

// Compass SVG as a data URI for the nav bar
const compassSvg = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16.5" cy="16.5" r="12.5" fill="#111827"/><path d="M13.9355 16C13.9355 15.4409 14.1398 14.957 14.5484 14.5484C14.957 14.1398 15.4409 13.9355 16 13.9355C16.5591 13.9355 17.043 14.1398 17.4516 14.5484C17.8602 14.957 18.0645 15.4409 18.0645 16C18.0645 16.5591 17.8602 17.043 17.4516 17.4516C17.043 17.8602 16.5591 18.0645 16 18.0645C15.4409 18.0645 14.957 17.8602 14.5484 17.4516C14.1398 17.043 13.9355 16.5591 13.9355 16ZM4.64516 4.70968C7.78496 1.56988 11.5699 0 16 0C20.4301 0 24.2043 1.55912 27.3226 4.67742C30.4409 7.79571 32 11.5699 32 16C32 20.4301 30.4409 24.2043 27.3226 27.3226C24.2043 30.4409 20.4301 32 16 32C11.5699 32 7.79571 30.4409 4.67742 27.3226C1.55912 24.2043 0 20.4301 0 16C0 11.5699 1.54837 7.80647 4.64516 4.70968ZM24.129 9.54839C24.3011 9.2043 24.3118 8.86022 24.1613 8.51613C24.0108 8.17204 23.7849 7.94624 23.4839 7.83871C23.1828 7.73118 22.8387 7.74193 22.4516 7.87097L13.1613 12.129C12.6882 12.3441 12.3441 12.6882 12.129 13.1613L7.87097 22.4516C7.6129 22.9677 7.69892 23.4409 8.12903 23.871C8.55914 24.3011 9.03226 24.3871 9.54839 24.129L18.8387 19.871C19.3118 19.6559 19.6559 19.3118 19.871 18.8387L24.129 9.54839Z" fill="#facc15"/></svg>`)}`;

function getStairColor(index: number, percent: number): string {
  if (index === 0) return "gold";
  if (index === 1) return "silver";
  if (index === 2) return "#cd7f32";
  return `rgba(205, 127, 50, ${percent / 100})`;
}

export async function generateOgImage(podiumData: Array<PodiumDataWithPercentAndHeightAndHighest>): Promise<Buffer> {
  // Pre-fetch all avatar images
  const allPictures = podiumData.flatMap((step) => step.pictures.filter(Boolean));
  await Promise.all(allPictures.map((pic) => getAvatarDataUri(pic)));

  const svg = await satori(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Merriweather Sans",
        backgroundColor: "white",
      }}
    >
      {/* Nav bar */}
      <div
        style={{
          height: "80px",
          width: "100%",
          backgroundColor: "#101827",
          color: "white",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          fontFamily: "Merriweather",
          fontWeight: 700,
          fontSize: "20px",
        }}
      >
        <img src={compassSvg} width={32} height={32} style={{ marginRight: "10px" }} />
        Le Quizz du Berger
      </div>

      {/* Main content area with podium */}
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          padding: "20px 80px 30px",
          height: "550px",
        }}
      >
        {/* Podium stairs */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            height: "100%",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {podiumData.map((step, i) => {
            const stairHeight = Math.max(step.height, 10);
            const fontSize = Math.max((step.percent / 100) * 36, 14);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  height: "100%",
                  width: i < 3 ? `${100 / podiumData.length + 2}%` : `${100 / podiumData.length}%`,
                  marginLeft: "3px",
                  marginRight: "3px",
                }}
              >
                {/* Avatars above the stair */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "-15px",
                  }}
                >
                  {step.pictures.filter(Boolean).map((pic: string, picIdx: number) => {
                    const avatarSrc = avatarCache.get(pic) || "";
                    return avatarSrc ? (
                      <img
                        key={picIdx}
                        src={avatarSrc}
                        width={40}
                        height={40}
                        style={{
                          borderRadius: "50%",
                          border: `2px solid ${step.colors[picIdx] || "#ccc"}`,
                          backgroundColor: step.colors[picIdx] || "#ccc",
                          marginLeft: picIdx > 0 ? "-15px" : "0",
                        }}
                      />
                    ) : null;
                  })}
                </div>

                {/* Stair bar */}
                <div
                  style={{
                    width: "100%",
                    height: `${stairHeight}%`,
                    backgroundColor: getStairColor(i, step.percent),
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontSize: `${fontSize}px`,
                      textAlign: "center",
                      width: "100%",
                      color: "#000",
                    }}
                  >
                    {step.percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Merriweather",
          data: merriweatherBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Merriweather Sans",
          data: merriweatherSans,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );

  // Convert SVG to PNG using resvg
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}
