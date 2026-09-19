export interface LaurelProps {
  side: "left" | "right";
  className?: string;
}

export function Laurel({ side, className = "" }: LaurelProps) {
  return (
    <svg
      width="32"
      height="52"
      viewBox="0 0 32 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={side === "right" ? { transform: "scale(-1, 1)" } : undefined}
    >
      {/* Central stem */}
      <path
        d="M19 48 C18 40 17 30 18 20 C19 11 21 5 21 5"
        stroke="#222222"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom leaf */}
      <path
        d="M18 43 C13 41 7 37 8 31 C13 33 17 38 18 43Z"
        fill="#222222"
      />
      {/* Lower-mid leaf */}
      <path
        d="M18 34 C13 30 7 25 10 19 C14 22 17 28 18 34Z"
        fill="#222222"
      />
      {/* Mid leaf */}
      <path
        d="M18 24 C14 20 11 14 14 9 C17 12 18 18 18 24Z"
        fill="#222222"
      />
      {/* Top leaf */}
      <path
        d="M19 15 C18 11 18 7 20 5 C22 7 22 11 19 15Z"
        fill="#222222"
      />
      {/* Leaf rib lines */}
      <path
        d="M18 43 C15 40 10 37 8 31"
        stroke="#ffffff"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M18 34 C14 30 9 26 10 19"
        stroke="#ffffff"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M18 24 C15 20 12 15 14 9"
        stroke="#ffffff"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
