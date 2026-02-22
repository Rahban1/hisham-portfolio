"use client";

import { useState, useRef, useEffect } from "react";

const mediaFiles = {
  videos: [
    "/media/WhatsApp Video 2026-02-22 at 08.05.30.mp4",
    "/media/WhatsApp Video 2026-02-22 at 08.02.51.mp4",
    "/media/WhatsApp Video 2026-02-22 at 08.01.44.mp4",
    "/media/WhatsApp Video 2026-02-22 at 07.57.06.mp4",
    "/media/WhatsApp Video 2026-02-22 at 07.54.14.mp4",
    "/media/WhatsApp Video 2026-02-22 at 07.51.56.mp4",
    "/media/WhatsApp Video 2026-02-22 at 07.51.06.mp4",
    "/media/WhatsApp Video 2026-02-22 at 07.49.15.mp4",
    "/media/WhatsApp Video 2026-02-22 at 07.47.52.mp4",
    "/media/WhatsApp Video 2026-02-22 at 07.46.49.mp4",
  ],
  image: "/media/WhatsApp Image 2026-02-22 at 07.58.07.jpeg",
};

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-piano-dark/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex justify-between items-center">
        <span className="font-heading text-xl tracking-[0.2em] text-text-primary">
          HISHAM
        </span>
        <div className="flex gap-8">
          {["About", "Gallery", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="font-body text-sm tracking-[0.15em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center grain">
      <div className="absolute inset-0 vignette" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-piano-dark to-transparent" />
      <div className="relative z-10 text-center px-6">
        <h1 className="font-heading text-[72px] md:text-[120px] font-light text-text-primary tracking-[0.05em] animate-pulse-slow">
          HISHAM
        </h1>
        <p className="font-body text-lg md:text-xl text-text-secondary tracking-[0.3em] uppercase mt-4">
          Synthesizer Artist
        </p>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <svg
          className="w-6 h-6 text-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-32 px-6 grain">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-heading text-3xl tracking-[0.15em] uppercase text-text-primary text-center mb-16">
          About
        </h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border border-text-secondary/20" />
            <img
              src={mediaFiles.image}
              alt="Hisham playing synthesizer"
              className="w-full h-[500px] object-cover grayscale contrast-125"
            />
          </div>
          <div>
            <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
              A passionate synthesizer player bringing electronic music to life
              through keys and knobs. With years of experience performing and
              producing, I explore the boundaries of sound, blending classical
              piano techniques with modern electronic synthesis.
            </p>
            <p className="font-body text-text-secondary text-lg leading-relaxed">
              Each performance is a journey through textures, tones, and
              emotions—crafted in real-time on stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  src,
  index,
  onPlay,
}: {
  src: string;
  index: number;
  onPlay: (index: number, rect: DOMRect) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onPlay(index, rect);
    }
  };

  return (
    <div
      ref={cardRef}
      className="video-card relative aspect-video bg-piano-card cursor-pointer group"
      onClick={handleClick}
    >
      <video
        src={src}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-piano-black/40 group-hover:bg-transparent transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-6 h-6 text-text-primary ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const [activeVideo, setActiveVideo] = useState<{
    index: number;
    rect: DOMRect;
  } | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleClose = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setIsClosing(true);
    setTimeout(() => {
      setActiveVideo(null);
      setIsClosing(false);
    }, 300);
  };

  const handlePlay = (index: number, rect: DOMRect) => {
    setActiveVideo({ index, rect });
  };

  return (
    <section id="gallery" className="py-32 px-6 bg-piano-gray grain">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-heading text-3xl tracking-[0.15em] uppercase text-text-primary text-center mb-16">
          Gallery
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaFiles.videos.map((video, index) => (
            <VideoCard
              key={index}
              src={video}
              index={index}
              onPlay={handlePlay}
            />
          ))}
        </div>
      </div>
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{
            animation: isClosing ? "fade-out 0.3s ease-out forwards" : "fade-in 0.3s ease-out forwards",
          }}
          onClick={handleClose}
        >
          <div
            className="absolute inset-0 bg-piano-dark/60 backdrop-blur-md"
            style={{
              animation: isClosing ? "fade-out 0.2s ease-out forwards" : "fade-in 0.2s ease-out forwards",
            }}
            onClick={handleClose}
          />
          <div
            className="relative z-10 w-full max-w-5xl"
            style={{
              animation: isClosing ? "shrink-to 0.3s ease-out forwards" : "expand-from 0.3s ease-out forwards",
              transformOrigin: `${
                ((activeVideo.rect.left + activeVideo.rect.width / 2) /
                  window.innerWidth) *
                100
              }% ${
                ((activeVideo.rect.top + activeVideo.rect.height / 2) /
                  window.innerHeight) *
                100
              }%`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-piano-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
              <video
                ref={modalVideoRef}
                src={mediaFiles.videos[activeVideo.index]}
                controls
                autoPlay={!isClosing}
                className="w-full max-h-[80vh] block"
                style={{ maxHeight: "calc(100vh - 120px)" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 px-6 grain">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="font-heading text-3xl tracking-[0.15em] uppercase text-text-primary mb-12">
          Contact
        </h2>
        <p className="font-body text-text-secondary text-lg mb-8">
          For bookings, collaborations, or just to say hello
        </p>
        <a
          href="mailto:hello@hisham.com"
          className="font-heading text-2xl md:text-3xl text-text-primary hover:text-text-accent transition-colors duration-200 underline decoration-text-secondary/30 hover:decoration-text-primary"
        >
          hello@hisham.com
        </a>
        <div className="flex justify-center gap-8 mt-16">
          {["Instagram", "YouTube", "SoundCloud"].map((social) => (
            <a
              key={social}
              href="#"
              className="font-body text-sm tracking-[0.15em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {social}
            </a>
          ))}
        </div>
        <footer className="mt-24 pt-8 border-t border-text-secondary/10">
          <p className="font-body text-sm text-text-secondary/50">
            © 2026 Hisham. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-piano-dark min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <Contact />
    </main>
  );
}
