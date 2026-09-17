export interface LaurelProps {
  side: "left" | "right";
  className?: string;
}

/** Original laurel wreath used for Guest favourite / rating headers. */
export function Laurel({ side, className = "" }: LaurelProps) {
  const transform = side === "right" ? "scale(-1 1)" : undefined;

  return (
    <svg
      width="40"
      height="48"
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={transform ? { transform } : undefined}
    >
      <path
        d="M18 46c-8-6-14-16-14-26C4 10 12 4 20 2c-3 6-4 12-2 20 2 8 6 16 8 24-3-1-6 0-8 0z"
        fill="#222222"
      />
      <path
        d="M12 10c3 2 5 5 6 8M8 18c4 2 6 5 7 8M7 26c4 2 7 5 8 8M10 34c3 2 6 4 8 6"
        stroke="#222222"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
