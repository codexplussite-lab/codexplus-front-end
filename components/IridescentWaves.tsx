import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Wave = {
  top: string;
  height: string;
  duration: string;
  floatDur: string;
  floatY: string;
  opacity: number;
  blur: string;
  strokeWidth: number;
  gradientId: string;
  colors: [string, string, string];
  path: string;
};

const waves: Wave[] = [
  {
    top: "12%",
    height: "30%",
    duration: "22s",
    floatDur: "7s",
    floatY: "14px",
    opacity: 0.7,
    blur: "2px",
    strokeWidth: 2,
    gradientId: "wave-g1",
    colors: ["#7437ff", "#9a66ff", "#2e3a59"],
    path: "M0,140 C 240,40 480,200 720,140 C 960,80 1200,220 1440,140",
  },
  {
    top: "34%",
    height: "34%",
    duration: "30s",
    floatDur: "9s",
    floatY: "18px",
    opacity: 0.5,
    blur: "5px",
    strokeWidth: 3,
    gradientId: "wave-g2",
    colors: ["#9a66ff", "#1e2537", "#4da3ff"],
    path: "M0,80 C 320,200 1120,0 1440,80",
  },
  {
    top: "60%",
    height: "28%",
    duration: "26s",
    floatDur: "6.5s",
    floatY: "12px",
    opacity: 0.6,
    blur: "1.5px",
    strokeWidth: 1.5,
    gradientId: "wave-g3",
    colors: ["#7437ff", "#2e3a59", "#4da3ff"],
    path: "M0,180 C 400,60 1040,260 1440,180",
  },
];

function WaveSvg({ wave }: { wave: Wave }) {
  return (
    <svg
      className="wave-svg"
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      style={{ opacity: wave.opacity, filter: `blur(${wave.blur})` }}
    >
      <defs>
        <linearGradient
          id={wave.gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0" stopColor={wave.colors[0]} />
          <stop offset="0.5" stopColor={wave.colors[1]} />
          <stop offset="1" stopColor={wave.colors[2]} />
        </linearGradient>
      </defs>
      <path
        d={wave.path}
        fill="none"
        stroke={`url(#${wave.gradientId})`}
        strokeWidth={wave.strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

type IridescentWavesProps = {
  className?: string;
};

export default function IridescentWaves({ className }: IridescentWavesProps) {
  return (
    <div aria-hidden className={cn("wave-scene", className)}>
      {waves.map((wave) => (
        <div
          key={wave.gradientId}
          className="wave-track"
          style={
            {
              "--wave-top": wave.top,
              "--wave-h": wave.height,
              "--wave-dur": wave.duration,
            } as CSSProperties
          }
        >
          <div
            className="wave-float"
            style={
              {
                "--wave-float-dur": wave.floatDur,
                "--wave-float-y": wave.floatY,
              } as CSSProperties
            }
          >
            <WaveSvg wave={wave} />
            <WaveSvg wave={wave} />
          </div>
        </div>
      ))}
    </div>
  );
}
