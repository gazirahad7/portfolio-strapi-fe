"use client";

import Image from "next/image";

export default function Hero({ data }: { data: any }) {
  console.log("hero img", data.HeroImage.url);
  return (
    <section className="w-full min-h-[calc(100vh-72px)] bg-[#f0faf3] flex items-center px-6 md:px-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-gray-900 leading-tight tracking-tight">
            Your Dedicated{" "}
            <span className="text-[#16a34a]">High-Performing</span> Tech Team
            for Agencies &amp; Digital Products
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md">
            We provide dedicated developers, software engineers and expert teams
            to help agencies, businesses, and startups build scalable, secure
            software and websites.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 text-sm md:text-base"
            >
              Book a Meeting
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
            <a
              href="#services"
              className="flex items-center gap-2 border-2 border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 font-semibold px-6 py-3 rounded-full transition-all duration-200 text-sm md:text-base"
            >
              Contact Now
            </a>
          </div>
        </div>

        {/* Right Column — Photo Grid */}
        <div className="relative grid grid-cols-2 gap-3">
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
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80"
              alt="Developer working"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle row: wide image + stat card stacked */}
          <div className="col-span-2 grid grid-cols-5 gap-3">
            {/* Wide office image */}
            <div className="col-span-3 rounded-2xl overflow-hidden aspect-video bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
                alt="Office space"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stat Card */}
            <div className="col-span-2 bg-white rounded-2xl p-4 flex flex-col justify-between shadow-md">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-2">
                  Complete Project
                </p>
                {/* Bar chart */}
                <div className="flex items-end gap-1 h-10">
                  {[30, 50, 65, 80, 90, 100, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i === 5 ? "#16a34a" : "#bbf7d0",
                      }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2 leading-snug">
                  We use an agile development approach to ensure fast,
                  efficient, and on-time delivery of top-quality software
                  solutions.
                </p>
              </div>
              <p className="text-3xl font-bold text-[#16a34a] mt-2">500+</p>
            </div>
          </div>

          {/* Bottom row: 2 images */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
              alt="Team meeting"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80"
              alt="Developers collaborating"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
