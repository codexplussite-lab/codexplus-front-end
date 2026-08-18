import { cn } from "@/lib/utils";

type Variant = "blobs" | "rings" | "grid" | "waves" | "prism" | "orbits";

type AbstractVisualProps = {
  palette?: [string, string, string] | null;
  variant: Variant;
  className?: string;
};

function Rings({ palette }: { palette: [string, string, string] }) {
  const [c1, c2] = palette;
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${20 + i * 22}%`,
            aspectRatio: "1",
            border: "1px solid",
            borderColor: i % 2 === 0 ? `${c1}66` : `${c2}55`,
            boxShadow: i === 4 ? `0 0 120px 10px ${c1}22` : undefined,
            transform: `rotate(${i * 18}deg)`,
          }}
        />
      ))}
      <div
        className="absolute size-[26%] rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${c2}55, transparent 70%)` }}
      />
    </div>
  );
}

function Blobs({ palette }: { palette: [string, string, string] }) {
  const [c1, c2, c3] = palette;
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-[10%] -top-[10%] h-[65%] w-[65%] rounded-full blur-3xl transition-transform duration-[2s] group-hover:scale-110"
        style={{ background: `radial-gradient(circle at 30% 30%, ${c1}55, transparent 70%)` }}
      />
      <div
        className="absolute bottom-[-15%] left-[30%] h-[70%] w-[70%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle at 60% 60%, ${c2}44, transparent 70%)` }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[55%] w-[55%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${c3}33, transparent 70%)` }}
      />
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay bg-dots"
      />
    </div>
  );
}

function Grid({ palette }: { palette: [string, string, string] }) {
  const [c1, c2] = palette;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: "900px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="h-[160%] w-[200%] origin-top bg-grid transition-transform duration-[2s] group-hover:translate-y-[-4%]"
        style={{
          transform: "rotateX(62deg) translateY(12%)",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />
      <div
        className="absolute h-[70%] w-[70%] rounded-full blur-[90px]"
        style={{ background: `radial-gradient(circle, ${c1}44, transparent 65%)` }}
      />
      <div
        className="absolute size-2 rounded-full"
        style={{ background: c2, boxShadow: `0 0 40px 12px ${c2}66` }}
      />
    </div>
  );
}

function Waves({ palette }: { palette: [string, string, string] }) {
  const [c1, c2] = palette;
  const paths = [
    "M0,64 C180,20 360,110 540,64 C720,20 900,110 1080,64 C1260,20 1440,110 1620,64",
    "M0,96 C180,52 360,140 540,96 C720,52 900,140 1080,96 C1260,52 1440,140 1620,96",
    "M0,128 C180,84 360,172 540,128 C720,84 900,172 1080,128 C1260,84 1440,172 1620,128",
  ];
  return (
    <div className="absolute inset-0">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1620 220"
        preserveAspectRatio="none"
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={i === 0 ? c1 : c2}
            strokeWidth={i === 0 ? 2.5 : 1.5}
            strokeOpacity={0.7 - i * 0.15}
            transform={`translate(0 ${i * 10})`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div
        className="absolute inset-0 mix-blend-overlay bg-grid"
        style={{ opacity: 0.3 }}
      />
    </div>
  );
}

function Prism({ palette }: { palette: [string, string, string] }) {
  const [c1, c2, c3] = palette;
  const layers = [
    { c: c1, rotate: "12deg", inset: "10%" },
    { c: c2, rotate: "-8deg", inset: "22%" },
    { c: c3, rotate: "4deg", inset: "34%" },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute inset-[6%] rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${c1}44, transparent 70%)` }}
      />
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute rounded-3xl border border-ink/10"
          style={{
            inset: l.inset,
            transform: `rotate(${l.rotate})`,
            background: `linear-gradient(140deg, ${l.c}22, transparent 55%)`,
            boxShadow: i === 1 ? `0 0 80px -10px ${l.c}44` : undefined,
            backdropFilter: "blur(1px)",
          }}
        />
      ))}
      <div
        className="absolute h-[12%] w-[12%] rounded-full blur-md"
        style={{ background: c2, boxShadow: `0 0 60px 20px ${c2}55` }}
      />
    </div>
  );
}

function Orbits({ palette }: { palette: [string, string, string] }) {
  const [c1, c2] = palette;
  const dots = [
    { angle: 0, size: 10, c: c2 },
    { angle: 120, size: 7, c: c1 },
    { angle: 240, size: 13, c: c2 },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex size-[46%] items-center justify-center">
        <div
          className="absolute inset-0 rounded-full border border-ink/15"
          style={{ boxShadow: `inset 0 0 60px -20px ${c1}66` }}
        />
        <div className="absolute size-[70%] rounded-full border border-ink/10" />
        <div
          className="absolute size-[38%] rounded-full blur-xl"
          style={{ background: `radial-gradient(circle, ${c1}55, transparent 70%)` }}
        />
        <div className="animate-spin-slow absolute inset-0">
          {dots.map((d, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-0"
              style={{ transform: `translateX(-50%) rotate(${d.angle}deg)` }}
            >
              <div
                className="size-3 rounded-full"
                style={{
                  width: d.size,
                  height: d.size,
                  background: d.c,
                  boxShadow: `0 0 20px 6px ${d.c}55`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AbstractVisual({
  palette,
  variant,
  className,
}: AbstractVisualProps) {
  const currentPalette = palette?.length ? palette : ["#3b82f6", "#1d4ed8"];
  const resolved: [string, string, string] = [
    currentPalette[0] ?? "#3b82f6",
    currentPalette[1] ?? "#7437ff",
    currentPalette[2] ?? "#232746",
  ];
  const [primary] = resolved;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background: `linear-gradient(150deg, ${primary}1a, transparent 40%)`,
      }}
    >
      {variant === "blobs" && <Blobs palette={resolved} />}
      {variant === "rings" && <Rings palette={resolved} />}
      {variant === "grid" && <Grid palette={resolved} />}
      {variant === "waves" && <Waves palette={resolved} />}
      {variant === "prism" && <Prism palette={resolved} />}
      {variant === "orbits" && <Orbits palette={resolved} />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}
