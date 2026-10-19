import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import type { HeroVideo } from "../components/Hero";
import About from "../components/About";
import SkillsTable from "../components/SkillsTable";
import ProjectsRail from "../components/ProjectsRail";
import Timeline from "../components/Timeline";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Hero intro video is optional: drop `hero.webm` / `hero.mp4` (+ optional
 *  `poster.webp`) into `public/hero/` and the hero swaps the portrait for the
 *  video. Checked at build time so we never render missing media. */
const HERO_DIR = join(process.cwd(), "public", "hero");
const heroVideo: HeroVideo | null = (() => {
  const webm = existsSync(join(HERO_DIR, "hero.webm")) ? "/hero/hero.webm" : null;
  const mp4 = existsSync(join(HERO_DIR, "hero.mp4")) ? "/hero/hero.mp4" : null;
  if (!webm && !mp4) return null;
  return {
    webm,
    mp4,
    poster: existsSync(join(HERO_DIR, "poster.webp")) ? "/hero/poster.webp" : null,
  };
})();

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero video={heroVideo} />
        <About />
        <SkillsTable />
        <ProjectsRail />
        <Timeline />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
