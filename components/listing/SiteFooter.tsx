const COLUMNS = [
  {
    title: "Support",
    links: ["Help Centre", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options"],
  },
  {
    title: "Hosting",
    links: ["Airbnb your home", "AirCover for Hosts", "Hosting resources", "Community forum"],
  },
  {
    title: "Airbnb",
    links: ["Newsroom", "New features", "Careers", "Investors"],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-light)] bg-surface-muted">
      <div className="mx-auto grid max-w-[var(--layout-max-width)] grid-cols-3 gap-8 px-[var(--layout-content-padding)] py-12">
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-primary">{column.title}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#main" className="text-sm text-primary hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--color-border-light)]">
        <div className="mx-auto flex max-w-[var(--layout-max-width)] items-center justify-between px-[var(--layout-content-padding)] py-6 text-sm text-primary">
          <p>© 2026 Airbnb clone · Privacy · Terms · Sitemap</p>
          <p>English (IN) · ₹ INR</p>
        </div>
      </div>
    </footer>
  );
}
