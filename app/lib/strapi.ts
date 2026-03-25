// lib/strapi.ts
import qs from "qs";
const STRAPI_URL = process.env.STRAPI_URL;
const rawStrapiToken = process.env.STRAPI_TOKEN ?? process.env.STRAPI_API_TOKEN;
const STRAPI_TOKEN =
  rawStrapiToken &&
  rawStrapiToken.trim() !== "" &&
  rawStrapiToken !== "your_api_token_here"
    ? rawStrapiToken
    : undefined;

if (!STRAPI_URL) {
  throw new Error("Missing STRAPI_URL environment variable");
}

interface StrapiResponse<T> {
  data: T;
}

interface StrapiErrorResponse {
  error?: {
    message?: string;
  };
}

interface FetchStrapiOptions {
  query?: object;
  revalidate?: number;
  tags?: string[];
  timeoutMs?: number;
}

async function fetchStrapi<T>(
  path: string,
  options: FetchStrapiOptions = {},
): Promise<T> {
  const { query, revalidate = 60, tags = [path], timeoutMs = 10000 } = options;

  const queryString = query
    ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
    : "";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const res = await fetch(`${STRAPI_URL}/api/${path}${queryString}`, {
    headers: STRAPI_TOKEN
      ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
      : undefined,
    next: { revalidate, tags },
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!res.ok) {
    const errorBody = (await res
      .json()
      .catch(() => ({}))) as StrapiErrorResponse;

    if (res.status === 401) {
      const authHint = STRAPI_TOKEN
        ? "Check STRAPI_TOKEN/STRAPI_API_TOKEN value in .env (it may be invalid or expired)."
        : "Add a valid STRAPI_TOKEN/STRAPI_API_TOKEN in .env or make this endpoint public in Strapi permissions.";
      throw new Error(
        `Strapi fetch failed (401) for ${path}: ${errorBody.error?.message ?? "Unauthorized"}. ${authHint}`,
      );
    }

    throw new Error(
      `Strapi fetch failed (${res.status}) for ${path}: ${errorBody.error?.message ?? "Unknown error"}`,
    );
  }

  const { data } = (await res.json()) as StrapiResponse<T>;
  return data;
}

export interface StrapiImage {
  url: string;
  alternativeText?: string;
}

interface HeroCta {
  href?: string;
  Text?: string;
  target?: boolean;
  Color?: string;
}

export interface HeroBlock {
  __component: "blocks.hero";
  ShortDescription?: string;
  HeroImage?: StrapiImage;
  BookingCta?: HeroCta;
  ContactCta?: HeroCta;
}

interface HomePageData {
  blocks: Array<HeroBlock | { __component: string }>;
}

export async function getHomepage() {
  return fetchStrapi<HomePageData>("home", {
    query: {
      populate: {
        blocks: {
          on: {
            "blocks.hero": {
              populate: {
                HeroImage: {
                  fields: ["url", "alternativeText"],
                },
                BookingCta: {
                  fields: ["href", "Text", "target", "Color"],
                },
                ContactCta: {
                  fields: ["href", "Text", "target", "Color"],
                },
              },
            },
          },
        },
      },
    },
    tags: ["home"],
  });
}

interface LogoOption {
  __component: string;
  logo?: StrapiImage;
}

interface GlobalData {
  Options: LogoOption[];
}

export function getMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

export function getLogoUrl(options: LogoOption[]): string | undefined {
  const logoOption = options.find(
    (option) => option.__component === "elements.logo",
  );
  return getMediaUrl(logoOption?.logo?.url);
}

export function getHeroBlock(
  blocks: Array<HeroBlock | { __component: string }> = [],
): HeroBlock | undefined {
  return blocks.find((block) => block.__component === "blocks.hero") as
    | HeroBlock
    | undefined;
}

export async function getGlobal() {
  return fetchStrapi<GlobalData>("global", {
    query: {
      populate: {
        Options: {
          on: {
            "elements.logo": {
              populate: {
                logo: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
          },
        },
        Footer: {
          populate: {
            footerLogo: {
              fields: ["name", "url", "alternativeText"],
            },
            Locations: {
              fields: ["Name", "LocationDetails"],
            },
            QuickLinks: {
              populate: "*",
            },
            Resources: {
              populate: "*",
            },
            Partner: {
              populate: "*",
            },
          },
        },
      },
    },
    tags: ["global"],
  });
}
