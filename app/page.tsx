import Hero from "./components/blocks/Hero";
import Navbar from "./components/Navbar";
import { getGlobal, getHomepage } from "./lib/strapi";

export default async function Home() {
  const data = await getHomepage();

  const footerData = await getGlobal();

  //console.log(data);

  const hero = data.blocks[0];

  //console.log("data", footerData?.Footer?.Locations);

  //console.log("footer", footerData?.Footer);

  return (
    <main className="min-h-screen bg-[#f0faf3]">
      <Navbar />
      <Hero data={hero} />
    </main>
  );
}
