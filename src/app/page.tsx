"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/nativecompo/Navbar";

export default function Page() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const y = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${y * 0.5}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-[140px] pb-20 ">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="relative">
            {/* LEFT (Desktop): fixed, no movement */}
            <section className="hidden lg:block fixed top-1/2 -translate-y-1/2 left-0 w-1/2">
              {/* keep same horizontal padding/centering as your container */}
              <div className="max-w-[1400px] mx-auto px-6">
                <div className="max-w-md">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Log in to Snapchat</h1>
                  <p className="text-gray-600 mb-8 text-lg">
                    Chat, Snap and video call your friends. Watch Stories and Spotlight, all from your computer.
                  </p>

                  <form className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                        Username or email address
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-snapchat-blue focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="text-center">
                      <Link href="/phone" className="text-sm text-snapchat-blue hover:text-[#0c94d6] font-medium">
                        Use phone number instead
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0ba5ee] hover:bg-[#0c94d6] text-white font-semibold py-3 rounded-full transition-all transform hover:scale-[1.02]"
                    >
                      Log in
                    </button>
                  </form>

                  <p className="mt-6 text-sm text-gray-600">
                    Looking for the app? Get it{" "}
                    <Link href="/download" className="text-gray-900 underline font-medium hover:no-underline">
                      here
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* LEFT (Mobile): normal flow so it doesn't cover content */}
            <section className="lg:hidden mb-10">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Log in to Snapchat</h1>
                <p className="text-gray-600 mb-8 text-lg">
                  Chat, Snap and video call your friends. Watch Stories and Spotlight, all from your computer.
                </p>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="username-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                      Username or email address
                    </label>
                    <input
                      id="username-mobile"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-snapchat-blue focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="text-center">
                    <Link href="/phone" className="text-sm text-snapchat-blue hover:text-[#0c94d6] font-medium">
                      Use phone number instead
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0ba5ee] hover:bg-[#0c94d6] text-white font-semibold py-3 rounded-full transition-all transform hover:scale-[1.02]"
                  >
                    Log in
                  </button>
                </form>

                <p className="mt-6 text-sm text-gray-600">
                  Looking for the app? Get it{" "}
                  <Link href="/download" className="text-gray-900 underline font-medium hover:no-underline">
                    here
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* RIGHT: unchanged content; shifted right on desktop to make room for fixed left */}
            <section ref={parallaxRef} className="space-y-6 will-change-transform lg:ml-[50%]">
              <div className="grid grid-cols-2 gap-6">
                <CardBig
                  title="Have fun with your friends and family."
                  cta="Find Your Friends"
                  gradient="from-[#FF6B6B] via-[#FFB84D] to-[#FFA07A]"
                  icon={
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  }
                />

                <CardBig
                  title="Express yourself with millions of Lenses."
                  cta="Try now"
                  gradient="from-[#4ECDC4] via-[#44A08D] to-[#56CCF2]"
                  icon={
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                      clipRule="evenodd"
                    />
                  }
                />

                <CardSmall title="Watch Spotlight" gradient="from-[#A8E6CF] via-[#DCEDC1] to-[#FFD3B6]">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </CardSmall>

                <CardSmall title="Share Stories" gradient="from-[#667EEA] via-[#764BA2] to-[#F093FB]">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </CardSmall>

                <CardBig
                  title="Connect with the world."
                  cta="Explore"
                  gradient="from-[#FC466B] via-[#3F5EFB] to-[#8E2DE2]"
                  icon={
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                      clipRule="evenodd"
                    />
                  }
                />

                <CardSmall title="Snap Map" gradient="from-[#F8B500] via-[#FCD535] to-[#FFE66D]">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </CardSmall>

                <CardSmall title="Memories" gradient="from-[#F54EA2] via-[#FF7676] to-[#FFAFBD]">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </CardSmall>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function CardBig(props: { title: string; cta: string; gradient: string; icon: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer col-span-2 h-[500px]">
      <div className={`absolute inset-0 bg-gradient-to-br ${props.gradient}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute top-8 left-8 right-8 z-10">
        <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            {props.icon}
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">{props.title}</h2>
      </div>

      <div className="absolute bottom-8 left-8 right-8 z-10">
        <button className="bg-white/95 hover:bg-white text-black font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg">
          {props.cta}
        </button>
      </div>
    </div>
  );
}

function CardSmall(props: { title: string; gradient: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-[300px]">
      <div className={`absolute inset-0 bg-gradient-to-br ${props.gradient}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 20 20">
          {props.children}
        </svg>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10">
        <h3 className="text-xl font-bold text-white drop-shadow-lg">{props.title}</h3>
      </div>
    </div>
  );
}
