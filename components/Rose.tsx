type Props = {
  x: number;
  y: number;
  size?: number;
  petal?: string;
  dark?: string;
  light?: string;
};

/** A simple layered SVG rose. Place it inside an <svg>. */
export default function Rose({
  x,
  y,
  size = 1,
  petal = "#d1345b",
  dark = "#8f1d3f",
  light = "#f27a9b",
}: Props) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <circle r="24" fill={dark} />
      <circle r="19" fill={petal} />
      <circle r="13" fill={light} opacity="0.85" />
      <path
        d="M0 0 C4 -2 7 3 1 7 C-7 11 -12 -2 -3 -9 C7 -16 17 -4 12 6"
        stroke={dark}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M-14 -10 C-8 -20 6 -22 12 -16" stroke="#fff4ea" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.5" />
    </g>
  );
}
