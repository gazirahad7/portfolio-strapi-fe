import Hero from "./components/blocks/Hero";
import Navbar from "./components/Navbar";
import { getGlobal, getHomepage, getLogoUrl } from "./lib/strapi";

export default async function Home() {
  const data = await getHomepage();

  const globalData = await getGlobal();

  //console.log(data);

  const hero = data.blocks[0];

  //console.log("data", footerData?.Footer?.Locations);

  //console.log("footer", footerData?.Footer);

  console.log(globalData);
  console.log("ggg", globalData);
  // const logoData = globalData.Options.find(
  //   (option: any) => option.__component === 'elements.logo'
  // );
  // console.log("Logo Data:", logoData);
  const logoUrl = getLogoUrl(globalData.Options);
  console.log("Logo URL:", logoUrl);

  return (
    <main className="min-h-screen bg-[#f0faf3]">
      <Navbar logoUrl={logoUrl} />
      <Hero data={hero} />
    </main>
  );
}
