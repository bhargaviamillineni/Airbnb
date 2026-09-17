/**
 * Original wordmark for this clone — not copied from Airbnb source.
 * Shape is a simplified Bélo-inspired loop plus “airbnb” text.
 */
export function AirbnbLogo() {
  return (
    <svg
      width="102"
      height="32"
      viewBox="0 0 102 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.2 29.8c-1.6-2.3-6.4-9.6-6.4-14.3 0-4.1 2.6-7 6.4-7s6.4 2.9 6.4 7c0 4.7-4.8 12-6.4 14.3z"
        fill="#FF385C"
      />
      <path
        d="M16.2 12.2c-1.5 0-2.7 1.3-2.7 3.2 0 2.6 2 6.6 2.7 8 0.7-1.4 2.7-5.4 2.7-8 0-1.9-1.2-3.2-2.7-3.2z"
        fill="white"
      />
      <path
        d="M16.2 30.2c6.8-9.8 10.6-14.4 10.6-19.3C26.8 6.2 22.4 2 16.2 2S5.6 6.2 5.6 10.9c0 4.9 3.8 9.5 10.6 19.3z"
        stroke="#FF385C"
        strokeWidth="2.2"
        fill="none"
      />
      <text
        x="34"
        y="22"
        fill="#FF385C"
        fontSize="17"
        fontWeight="700"
        fontFamily="var(--font-sans)"
        letterSpacing="-0.6"
      >
        airbnb
      </text>
    </svg>
  );
}
