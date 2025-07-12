import { useEffect, useState } from "react";

export default function Svg({ points }) {
  const [id, setid] = useState(0);

  useEffect(() => {
    if (!points.length) return;
    setid(0);
    const interval = setInterval(() => {
      setid((i) => (i + 1) % points.length);
    }, 20);
    return () => clearInterval(interval);
  }, [points]);

  return (
    <svg width={1000} height={300} className="ecg-graph">
      <path
        d={points.length ? "M" + points.map(p => `${p.x},${p.y}`).join(" L") : ""}
        stroke="#00FFB2"
        fill="none"
        strokeWidth="2"
      />
      {points.length > 0 && (
        <circle
          cx={points[id].x}
          cy={points[id].y}
          r="5"
          fill="#FF4D6D"
          className="graph-pointer"
        />
      )}
    </svg>
  );
}
