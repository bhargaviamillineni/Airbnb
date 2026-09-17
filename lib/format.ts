const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number, currency = "INR"): string {
  if (currency === "INR") {
    return INR_FORMATTER.format(amount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatGuestStats(
  guests: number,
  bedrooms: number,
  beds: number,
  bathrooms: number,
): string {
  const guestLabel = guests === 1 ? "guest" : "guests";
  const bedroomLabel = bedrooms === 1 ? "bedroom" : "bedrooms";
  const bedLabel = beds === 1 ? "bed" : "beds";
  const bathLabel = bathrooms === 1 ? "bathroom" : "bathrooms";

  return `${guests} ${guestLabel} · ${bedrooms} ${bedroomLabel} · ${beds} ${bedLabel} · ${bathrooms} ${bathLabel}`;
}
