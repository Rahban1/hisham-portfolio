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

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function ScrollWrapper({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`scroll-animate ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? "bg-piano-dark/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <span className="font-heading text-xl md:text-2xl tracking-[0.3em] text-text-primary font-light">
          HISHAM
        </span>
        
        <button
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 relative z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-text-primary transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-text-primary transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-text-primary transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        <div className={`md:hidden fixed inset-0 bg-piano-dark/98 flex flex-col justify-center items-center gap-8 transition-all duration-300 z-40 ${menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}>
          {["About", "Gallery", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="font-body text-sm md:text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-text-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center grain overflow-hidden">
      <div className="absolute inset-0 vignette" />
      
      <div className="absolute top-1/4 left-10 w-px h-40 bg-gradient-to-b from-transparent via-text-secondary/30 to-transparent" />
      <div className="absolute top-1/3 right-16 w-px h-60 bg-gradient-to-b from-transparent via-text-secondary/20 to-transparent" />
      <div className="absolute bottom-1/3 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-text-secondary/20 to-transparent" />

      <div className="absolute top-1/2 left-[10%] w-3 h-3 bg-piano-white/10 rotate-45" />
      <div className="absolute top-1/3 right-[15%] w-2 h-2 bg-piano-white/10 rotate-45" />
      <div className="absolute bottom-[20%] left-[20%] w-4 h-4 border border-piano-white/10 rotate-12" />

      <div className="relative z-10 text-center px-6">
        <p className="font-body text-xs tracking-[0.5em] uppercase text-text-secondary mb-8 animate-slide-up">
          Piano Artist
        </p>
        <h1 className="font-heading text-[80px] md:text-[160px] lg:text-[200px] font-light text-text-primary tracking-[0.02em] leading-none animate-slide-up-delay-1">
          H<br className="md:hidden" />I<br className="md:hidden" />S<br className="md:hidden" />H<br className="md:hidden" />A<br className="md:hidden" />M
        </h1>
        <div className="flex items-center justify-center gap-4 mt-8 animate-slide-up-delay-2">
          <div className="w-12 h-px bg-text-secondary/50" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-text-secondary">
            Performance
          </span>
          <div className="w-12 h-px bg-text-secondary/50" />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-40 px-6 grain relative overflow-hidden">
      <div className="absolute top-20 right-0 w-64 h-64 border border-text-secondary/10 rotate-12 opacity-30" />
      <div className="absolute bottom-20 left-10 w-32 h-32 border border-text-secondary/10 -rotate-6 opacity-20" />
      
      <div className="max-w-[1200px] mx-auto">
        <ScrollWrapper>
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-16 h-px bg-text-secondary/30" />
            <h2 className="font-heading text-2xl tracking-[0.3em] uppercase text-text-primary">
              About
            </h2>
            <div className="w-16 h-px bg-text-secondary/30" />
          </div>
        </ScrollWrapper>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <ScrollWrapper delay={0.1} className="md:col-span-5">
            <div className="relative inline-block w-full">
              <div className="absolute -top-4 -left-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] border border-text-secondary/20" />
              <div className="relative ml-4 mt-4">
                <img
                  src={mediaFiles.image}
                  alt="Playing Piano"
                  className="w-full h-auto max-h-[500px] object-contain grayscale contrast-110"
                />
              </div>
            </div>
          </ScrollWrapper>

          <ScrollWrapper delay={0.2} className="md:col-span-7 md:pl-8">
            <div className="space-y-8">
              <p className="font-heading text-3xl md:text-4xl font-light text-text-primary leading-relaxed">
                &ldquo;Music is the language between the notes.&rdquo;
              </p>
              <div className="w-12 h-px bg-text-secondary/30" />
              <p className="font-body text-text-secondary text-lg leading-relaxed">
                A passionate piano player bringing electronic music to life
                through keys and knobs. With years of experience performing and
                producing, I explore the boundaries of sound, blending classical
                piano techniques with modern electronic synthesis.
              </p>
              <p className="font-body text-text-secondary text-lg leading-relaxed">
                Each performance is a journey through textures, tones, and
                emotions—crafted in real-time on stage.
              </p>
            </div>
          </ScrollWrapper>
        </div>
      </div>
    </section>
  );
}

function PianoKeyDivider() {
  return (
    <div className="flex items-center gap-1 py-16">
      <div className="w-8 h-1 bg-piano-black" />
      <div className="w-1 h-1 bg-piano-white" />
      <div className="w-8 h-1 bg-piano-black" />
      <div className="w-1 h-1 bg-piano-white" />
      <div className="w-8 h-1 bg-piano-black" />
      <div className="w-1 h-1 bg-piano-white" />
      <div className="w-8 h-1 bg-piano-black" />
      <div className="w-1 h-1 bg-piano-white" />
      <div className="w-8 h-1 bg-piano-black" />
      <div className="flex-1 h-px bg-gradient-to-r from-text-secondary/30 to-transparent mx-4" />
    </div>
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
  const mounted = useIsMounted();

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onPlay(index, rect);
    }
  };

  return (
    <ScrollWrapper delay={index * 0.1}>
      <div
        ref={cardRef}
        className="video-card relative aspect-video bg-piano-black cursor-pointer group overflow-hidden"
        onClick={handleClick}
      >
        {mounted && (
          <video
            src={src}
            className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-500"
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full border-2 border-text-primary flex items-center justify-center">
            <svg
              className="w-6 h-6 text-text-primary ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-text-primary/80">
            Performance
          </span>
          <span className="font-heading text-lg text-text-primary/60">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-secondary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-secondary/30 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-text-secondary/20 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-text-secondary/20 to-transparent" />
      </div>
    </ScrollWrapper>
  );
}

function MobileVideoCard({
  src,
  index,
  onPlay,
}: {
  src: string;
  index: number;
  onPlay: (index: number, rect: DOMRect) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mounted = useIsMounted();

  useEffect(() => {
    if (videoRef.current && mounted) {
      videoRef.current.play().catch(() => {});
    }
  }, [mounted]);

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onPlay(index, rect);
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative aspect-video bg-piano-black cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {mounted && (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
        />
      )}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-text-primary/80 flex items-center justify-center bg-piano-black/30">
          <svg
            className="w-6 h-6 text-text-primary ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
        <span className="font-heading text-xs tracking-[0.3em] uppercase text-text-primary/80">
          Performance
        </span>
        <span className="font-heading text-lg text-text-primary/60">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-secondary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-secondary/30 to-transparent" />
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
  const mounted = useIsMounted();

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

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
    <section id="gallery" className="py-40 px-6 bg-piano-gray grain relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-secondary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-secondary/20 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto">
        <ScrollWrapper>
          <div className="text-center mb-20">
            <PianoKeyDivider />
            <h2 className="font-heading text-3xl md:text-4xl tracking-[0.2em] uppercase text-text-primary mt-8">
              Gallery
            </h2>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-secondary mt-4">
              {mediaFiles.videos.length} Performances
            </p>
          </div>
        </ScrollWrapper>

        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 pb-4">
            {mediaFiles.videos.map((video, index) => (
              <div key={index} className="snap-center shrink-0 w-[85vw]">
                <MobileVideoCard
                  src={video}
                  index={index}
                  onPlay={handlePlay}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-12">
          {mediaFiles.videos.map((video, index) => (
            <VideoCard
              key={index}
              src={video}
              index={index}
              onPlay={handlePlay}
            />
          ))}
        </div>

        <ScrollWrapper delay={0.5}>
          <PianoKeyDivider />
        </ScrollWrapper>
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
            className="absolute inset-0 bg-piano-dark/70 backdrop-blur-lg"
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
                suppressHydrationWarning
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
    <section id="contact" className="py-40 px-6 grain relative overflow-hidden">
      <div className="absolute top-20 left-10 w-40 h-40 border border-text-secondary/10 rotate-45 opacity-20" />
      <div className="absolute bottom-20 right-10 w-60 h-60 border border-text-secondary/10 rotate-12 opacity-15" />
      
      <div className="max-w-[800px] mx-auto text-center">
        <ScrollWrapper>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-text-secondary/30" />
            <h2 className="font-heading text-2xl tracking-[0.3em] uppercase text-text-primary">
              Contact
            </h2>
            <div className="w-16 h-px bg-text-secondary/30" />
          </div>
        </ScrollWrapper>

        <ScrollWrapper delay={0.1}>
          <p className="font-body text-text-secondary text-lg mb-12 max-w-md mx-auto">
            For bookings, collaborations, or just to say hello
          </p>
        </ScrollWrapper>

        <ScrollWrapper delay={0.2}>
          <a
            href="mailto:heshamqureshi6@gmail.com"
            className="inline-block font-heading text-3xl md:text-4xl text-text-primary hover:text-text-accent transition-all duration-300 relative group"
          >
            heshamqureshi6@gmail.com
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-text-primary transition-all duration-300 group-hover:w-full" />
          </a>
        </ScrollWrapper>

        <ScrollWrapper delay={0.3}>
          <div className="flex justify-center gap-12 mt-20">
            <a
              href="https://www.instagram.com/hishamqureshii"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary hover:text-text-primary transition-all duration-300 relative group"
            >
              Instagram
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-text-primary transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </ScrollWrapper>

        <ScrollWrapper delay={0.4}>
          <footer className="mt-24 pt-8 border-t border-text-secondary/10 flex flex-col md:flex-row justify-center items-center gap-4">
            <a
              href="https://x.com/RahbanGhani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs tracking-[0.2em] text-text-secondary/40 hover:text-text-primary transition-colors duration-300"
            >
              Made by Rahban
            </a>
          </footer>
        </ScrollWrapper>
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
