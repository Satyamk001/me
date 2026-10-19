"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import SkillsTable from "../components/SkillsTable";
import ProjectsRail from "../components/ProjectsRail";
import Timeline from "../components/Timeline";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import SmoothScroll from "../components/SmoothScroll";

export default function Home() {
  useEffect(() => {
    // Scroll reveal observer matching reference website
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    const elements = document.querySelectorAll(".rv, .rv-mask");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
