import Hero from "./components/blocks/Hero";
import Navbar from "./components/Navbar";
import { getGlobal, getHeroBlock, getHomepage, getLogoUrl } from "./lib/strapi";

export default async function Home() {
  const [data, globalData] = await Promise.all([getHomepage(), getGlobal()]);
  const hero = getHeroBlock(data.blocks);
  const logoUrl = getLogoUrl(globalData.Options ?? []);

  return (
    <main className="min-h-screen bg-[#f0faf3]">
      <Navbar logoUrl={logoUrl} />
      <Hero data={hero} />
    </main>
  );
}
