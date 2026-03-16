"use client";

import Image from "next/image";

export default function Hero({ data }: { data: any }) {
  console.log("hero img", data);

  const { BookingCta, ContactCta } = data || {};
  return (
    <section className="w-full min-h-[calc(100vh-72px)]  flex items-center px-6 md:px-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-gray-900 leading-tight tracking-tight">
            Your Dedicated
            <span className="text-[#16a34a]"> High-Performing</span> Tech Team
            for Agencies &amp; Digital Products
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md">
            {data?.ShortDescription}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {BookingCta && (
              <a
                href={BookingCta.href || "#"}
                target={BookingCta.target ? "_blank" : undefined}
                rel={BookingCta.target ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 text-sm md:text-base"
              >
                {BookingCta.Text || "Book a Meeting"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            )}
            {ContactCta && (
              <a
                href={ContactCta.href || "#"}
                target={ContactCta.target ? "_blank" : undefined}
                rel={ContactCta.target ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 border-2 border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 font-semibold px-6 py-3 rounded-full transition-all duration-200 text-sm md:text-base"
              >
                {ContactCta.Text || "Contact Now"}
              </a>
            )}
          </div>
        </div>

        {/* Right Column — Photo Grid */}
        <div className="relative ">
          <Image
            src={
              process.env.STRAPI_URL && data?.HeroImage?.url
                ? `${process.env.STRAPI_URL}${data.HeroImage.url}`
                : "/fallback-image.jpg"
            }
            alt={"Hero Image"}
            className="w-full h-full object-cover rounded-2xl"
            width={600}
            height={400}
          />
          {/* Top row: 2 images */}
        </div>
      </div>
    </section>
  );
}
