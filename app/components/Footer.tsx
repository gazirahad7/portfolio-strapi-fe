import Image from "next/image";
import {
  getMediaUrl,
  type FooterData,
  type FooterLinkItem,
} from "../lib/strapi";

function getLabel(item: FooterLinkItem): string {
  return item.Label || item.Text || item.Name || item.Title || item.Tag || "";
}

function getHref(item: FooterLinkItem): string | undefined {
  return item.Url || item.href || item.Link;
}

function getTarget(item: FooterLinkItem): boolean {
  return Boolean(item.Target ?? item.target);
}

function collectLinkItems(source: unknown): FooterLinkItem[] {
  if (!source) return [];

  if (Array.isArray(source)) {
    return source.filter(
      (item): item is FooterLinkItem =>
        typeof item === "object" && item !== null,
    );
  }

  if (typeof source !== "object" || source === null) return [];

  const items: FooterLinkItem[] = [];
  for (const value of Object.values(source)) {
    if (Array.isArray(value)) {
      const nested = value.filter(
        (item): item is FooterLinkItem =>
          typeof item === "object" && item !== null,
      );
      items.push(...nested);
    }
  }

  return items;
}

function getSocialKey(item: FooterLinkItem): string {
  const raw =
    `${item.Platform || ""} ${item.Icon || ""} ${getLabel(item)} ${getHref(item) || ""}`.toLowerCase();
  if (raw.includes("linkedin")) return "linkedin";
  if (raw.includes("instagram")) return "instagram";
  if (raw.includes("facebook")) return "facebook";
  if (raw.includes("twitter") || raw.includes("x.com")) return "x";
  return "link";
}

function getHostLabel(href: string): string {
  try {
    return new URL(href).hostname.replace("www.", "").split(".")[0];
  } catch {
    return href.replace(/^https?:\/\//, "").split("/")[0];
  }
}

function SocialIcon({ type }: { type: string }) {
  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M6.94 8.5H3.56V20h3.38zm.22-4.14A1.96 1.96 0 0 0 5.2 2.4a1.96 1.96 0 0 0-1.95 1.96c0 1.08.87 1.95 1.95 1.95 1.08 0 1.96-.87 1.96-1.95M20 12.29c0-2.97-1.58-4.35-3.69-4.35a3.2 3.2 0 0 0-2.9 1.6V8.5H10V20h3.41v-6.2c0-1.63.31-3.2 2.34-3.2 2 0 2.03 1.87 2.03 3.3V20H21z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.25-1.47 1.53-1.47H17V4.02A25 25 0 0 0 14.32 4C11.67 4 9.85 5.62 9.85 8.59V10H7v3h2.85v8z" />
      </svg>
    );
  }

  if (type === "x") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M18.9 3h2.95l-6.45 7.37L23 21h-6l-4.7-6.15L6.9 21H3.95l6.9-7.9L1 3h6.15l4.24 5.55zM17.9 19h1.66L6.2 4.9H4.4z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 14 21 3" />
      <path d="M15 3h6v6" />
      <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
    </svg>
  );
}

function Footer({ data }: { data?: FooterData }) {
  console.log("footer ", data);

  const resources = (data?.Resources || []).filter((item) => item.Tag);
  const quickLinks = collectLinkItems(data?.QuickLinks).filter((item) => {
    return Boolean(getLabel(item) && getHref(item));
  });
  const socialLinks = collectLinkItems(data?.SocialLinks).filter((item) => {
    return Boolean(getHref(item));
  });
  const partnerLinks = collectLinkItems(data?.Partner).filter((item) => {
    return Boolean(getHref(item));
  });

  const footerLogoUrl = getMediaUrl(data?.footerLogo?.url);
  const contactLink = quickLinks.find((item) =>
    getLabel(item).toLowerCase().includes("contact"),
  );

  return (
    <footer className="relative mt-16 overflow-hidden bg-[#012f22] text-[#d9f7e8]">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 md:px-10 md:pt-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:gap-8">
          <div className="space-y-6">
            {footerLogoUrl && (
              <Image
                src={footerLogoUrl}
                alt={data?.footerLogo?.alternativeText || "Footer logo"}
                className="h-10 w-auto object-contain"
                width={220}
                height={40}
              />
            )}

            {data?.quote && (
              <p className="max-w-xs text-sm leading-6 text-[#c7efdb]">
                {data.quote}
              </p>
            )}

            {contactLink && getHref(contactLink) && (
              <a
                href={getHref(contactLink)}
                target={getTarget(contactLink) ? "_blank" : undefined}
                rel={getTarget(contactLink) ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-md bg-[#9be7b9] px-5 py-2 text-sm font-medium text-[#033829] transition hover:bg-[#b7f2cf]"
              >
                {getLabel(contactLink)}
                <span aria-hidden className="text-base leading-none">
                  &gt;
                </span>
              </a>
            )}
          </div>

          <div>
            <h3 className="mb-4 text-xl font-medium text-[#dcfbe9]">Tags</h3>
            <ul className="space-y-2.5 text-sm text-[#b9e7d1]">
              {resources.map((item) => (
                <li key={item.id}>{item.Tag}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-medium text-[#dcfbe9]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-[#b9e7d1]">
              {quickLinks.map((item, index) => {
                const href = getHref(item);
                const label = getLabel(item);
                if (!href || !label) return null;

                return (
                  <li key={`${label}-${index}`}>
                    <a
                      href={href}
                      target={getTarget(item) ? "_blank" : undefined}
                      rel={getTarget(item) ? "noopener noreferrer" : undefined}
                      className="transition hover:text-[#e9fff3]"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-medium text-[#dcfbe9]">
              Marketing Solution
            </h3>
            <ul className="space-y-2.5 text-sm text-[#b9e7d1]">
              {partnerLinks.map((item, index) => {
                const href = getHref(item);
                if (!href) return null;

                const label = getLabel(item) || getHostLabel(href);

                return (
                  <li key={`${href}-${index}`}>
                    <a
                      href={href}
                      target={getTarget(item) ? "_blank" : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-[#3ea67b] px-4 py-1.5 text-base font-semibold text-[#f6fff9] transition hover:bg-[#0d5e41]"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pointer-events-none relative z-0 mt-8">
          <p className="w-fit min-w-full whitespace-nowrap select-none text-[clamp(3rem,13vw,12.5rem)] font-black leading-none tracking-tight text-white/55 [text-shadow:0_18px_24px_rgba(0,0,0,0.35)]">
            Webermelon
          </p>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#012f22] to-transparent" />
        </div>

        {data?.Locations && data.Locations.length > 0 && (
          <div className="relative z-10 -mt-10 rounded-2xl border border-[#1e6e4f] bg-[#0b4a34]/90 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur md:-mt-12 md:p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.Locations.map((item) => (
                <article key={item.id} className="space-y-2">
                  {item.Name && (
                    <h4 className="text-2xl font-medium text-[#dcfbe9]">
                      {item.Name}
                    </h4>
                  )}
                  {item.LocationDetails && (
                    <p className="max-w-xs whitespace-pre-line text-sm leading-6 text-[#b9e7d1]">
                      {item.LocationDetails}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-5 border-t border-[#166045] pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {socialLinks.map((item, index) => {
              const href = getHref(item);
              if (!href) return null;

              const iconType = getSocialKey(item);
              const label = getLabel(item) || iconType;

              return (
                <a
                  key={`${href}-${index}`}
                  href={href}
                  target={getTarget(item) ? "_blank" : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#78c8a4] text-[#e8fff4] transition hover:bg-[#0b4f38]"
                >
                  <SocialIcon type={iconType} />
                </a>
              );
            })}
          </div>

          {data?.copyright && (
            <p className="text-sm text-[#b4e2cc] md:text-right">
              {data.copyright}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
