export interface LightboxCounterProps {
  current: number;
  total: number;
  id?: string;
}

export function LightboxCounter({ current, total, id }: LightboxCounterProps) {
  return (
    <p id={id} className="text-sm font-medium">
      {current} / {total}
    </p>
  );
}
