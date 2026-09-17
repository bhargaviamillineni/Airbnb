export interface AvatarProps {
  name: string;
  initial?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  src?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-[var(--size-avatar-lg)] w-[var(--size-avatar-lg)] text-xl",
} as const;

export function Avatar({
  name,
  initial,
  size = "sm",
  color = "#222222",
  src,
}: AvatarProps) {
  const letter = initial ?? name.charAt(0).toUpperCase();

  if (src) {
    return (
      <span
        className={`relative inline-flex shrink-0 overflow-hidden rounded-full ${sizeClasses[size]}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- initials-safe remote avatars */}
        <img src={src} alt="" className="h-full w-full object-cover" />
        <span className="sr-only">{name}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-text-inverse ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}
