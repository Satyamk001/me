import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
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

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
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
