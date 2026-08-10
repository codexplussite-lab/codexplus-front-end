type PolyhedronProps = {
  className?: string;
  stroke?: string;
  vertexFill?: string;
};

const OUTER: ReadonlyArray<readonly [number, number]> = [
  [320, 200],
  [260, 304],
  [140, 304],
  [80, 200],
  [140, 96],
  [260, 96],
];

const INNER: ReadonlyArray<readonly [number, number]> = [
  [247.6, 172.5],
  [200, 145],
  [152.4, 172.5],
  [152.4, 227.5],
  [200, 255],
  [247.6, 227.5],
];

const CENTER: readonly [number, number] = [200, 200];

export default function Polyhedron({
  className,
  stroke = "rgba(148,163,184,0.18)",
  vertexFill = "rgba(148,163,184,0.28)",
}: PolyhedronProps) {
  const outerClosed = [...OUTER, OUTER[0]].map((p) => p.join(",")).join(" ");
  const innerClosed = [...INNER, INNER[0]].map((p) => p.join(",")).join(" ");

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
      className={className}
    >
      <polygon
        points={outerClosed}
        stroke={stroke}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points={innerClosed}
        stroke={stroke}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      {OUTER.map((p, i) => (
        <line
          key={`edge-${i}`}
          x1={INNER[i][0]}
          y1={INNER[i][1]}
          x2={p[0]}
          y2={p[1]}
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {INNER.map((p, i) => (
        <line
          key={`spoke-${i}`}
          x1={p[0]}
          y1={p[1]}
          x2={CENTER[0]}
          y2={CENTER[1]}
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {[0, 1, 3, 4].map((i) => (
        <circle
          key={`v-${i}`}
          cx={OUTER[i][0]}
          cy={OUTER[i][1]}
          r="3"
          fill={vertexFill}
        />
      ))}
      {[0, 2, 4].map((i) => (
        <circle
          key={`iv-${i}`}
          cx={INNER[i][0]}
          cy={INNER[i][1]}
          r="2"
          fill={vertexFill}
        />
      ))}
    </svg>
  );
}
