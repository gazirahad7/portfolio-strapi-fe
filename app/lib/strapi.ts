// lib/strapi.ts
import qs from "qs";
const STRAPI_URL = process.env.STRAPI_URL;

async function fetchStrapi(path: string, query?: object) {
  const queryString = query
    ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
    : "";
  const res = await fetch(`${STRAPI_URL}/api/${path}${queryString}`, {
    next: { revalidate: 60 },
  });

  console.log(res);
  if (!res.ok) throw new Error(`Strapi fetch failed: ${path}`);
  const { data } = await res.json();
  return data;
}

export async function getHomepage() {
  return fetchStrapi("home", {
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
  });
}
interface StrapiImage {
  url: string;
  alternativeText?: string;
}

interface LogoOption {
  __component: "elements.logo";
  logo: StrapiImage;
}

export function getLogoUrl(options: LogoOption[]): string | undefined {
  const logoOption = options.find(
    (option) => option.__component === "elements.logo",
  );
  return logoOption?.logo?.url
    ? `${STRAPI_URL}${logoOption.logo.url}`
    : undefined;
}

export async function getGlobal() {
  return fetchStrapi("global", {
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
  });
}
