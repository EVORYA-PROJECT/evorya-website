"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/config";
import type { HeroContent } from "@/lib/cms/types";

export default function Hero({ content }: { content: HeroContent }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(useTransform(mx, [-1, 1], [-30, 30]), {
    stiffness: 50,
    damping: 22,
  });
  const glowY = useSpring(useTransform(my, [-1, 1], [-30, 30]), {
    stiffness: 50,
    damping: 22,
  });
  const gridX = useSpring(useTransform(mx, [-1, 1], [10, -10]), {
    stiffness: 60,
    damping: 20,
  });
  const gridY = useSpring(useTransform(my, [-1, 1], [10, -10]), {
    stiffness: 60,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!sectionRef.current || !window.matchMedia("(pointer: fine)").matches)
      return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  const words = content.title.split(" ");

  return (
    <section
      id="accueil"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="bg-noise relative flex min-h-[100dvh] flex-col overflow-hidden bg-ink pt-[72px] lg:pt-20"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: gridX, y: gridY }}
        className="bg-grid pointer-events-none absolute -inset-x-10 -inset-y-10"
      />

      <motion.div
        aria-hidden="true"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(circle, rgba(242,242,242,0.05) 0%, rgba(242,242,242,0.02) 45%, transparent 72%)",
        }}
        className="pointer-events-none absolute right-[-15%] top-[-10%] h-[70vw] max-h-[720px] w-[70vw] max-w-[720px] rounded-full blur-2xl lg:right-[-8%] lg:top-[-15%] lg:h-[42vw] lg:w-[42vw]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[16%] hidden h-56 w-px bg-gradient-to-b from-transparent via-line-strong to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[16%] hidden h-px w-56 bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
      />

      <div className="relative z-10 flex items-center justify-between px-6 pt-8 font-display text-[10px] uppercase tracking-[0.3em] text-mist sm:px-8 lg:px-12">
        <span>EVORYA® — DIGITAL EXPERIENCE STUDIO</span>
        <span className="hidden sm:inline">
          EST. {SITE.founded} / {SITE.location.toUpperCase()}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <h1 className="max-w-5xl text-[2.6rem] leading-[1.04] font-medium tracking-tight text-paper sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.6rem] xl:text-[6.4rem]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-8 max-w-xl text-base text-mist sm:text-lg"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex h-14 items-center justify-center bg-paper px-8 font-display text-xs uppercase tracking-[0.25em] text-ink"
            >
              {content.ctaPrimary}
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#offres"
              className="inline-flex h-14 items-center justify-center border border-line-strong px-8 font-display text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-paper"
            >
              {content.ctaSecondary}
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden border-t border-line py-4">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-xs uppercase tracking-[0.35em] text-mist-dim">
          {Array.from({ length: 2 }).map((_, loop) => (
            <div key={loop} className="flex shrink-0 gap-12">
              {[
                "Design",
                "Développement",
                "Performance",
                "SEO",
                "Identité digitale",
                "Accompagnement",
              ].map((word) => (
                <span key={word} className="flex items-center gap-12">
                  {word}
                  <span className="h-1 w-1 rounded-full bg-mist-dim" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
