"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Github, Linkedin } from "lucide-react";
import { HeroScene } from "./three/hero-scene";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 1, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <HeroScene />
            <Stars
              radius={100}
              depth={50}
              count={3000}
              factor={4}
              saturation={0.2}
              fade
              speed={0.5}
            />
            <Environment preset="forest" />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background pointer-events-none" />

      {/* Content - improved responsive padding and spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 rounded-full bg-primary/10 border border-primary/20">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          <span className="text-xs sm:text-sm font-medium text-primary">
            Dehradun, Uttarakhand
          </span>
        </div>

        {/* Greeting in Garhwali - responsive text sizes */}
        <p className="text-base sm:text-lg md:text-xl text-accent mb-2 font-medium">
          {"नमस्कार (Namaste)"}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 sm:mb-4 max-w-4xl text-balance">
          {"I'm"} <span className="text-primary">Navdeep Shah</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2">
          Software Developer
        </p>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mb-6 sm:mb-8 text-pretty px-2">
          Design-driven software engineer specializing in AI-powered media
          systems, AR/3D experiences, and full-stack platforms. Building
          end-to-end products with LLMs, retrieval pipelines, and automation .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto px-4 sm:px-0">
          <Button
            size="lg"
            onClick={() => scrollToSection("projects")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 group w-full sm:w-auto"
          >
            View My Work
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-border text-foreground hover:bg-secondary bg-transparent w-full sm:w-auto"
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex gap-3 sm:gap-4">
          <a
            href="https://linkedin.com/in/navdeep-shah-a56982207"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://github.com/oNavShaHo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>

        {/* Stats - responsive grid and spacing */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-16 w-full max-w-2xl lg:max-w-3xl px-4 sm:px-0">
          {[
            { value: "1.5+", label: "Years Experience" },
            { value: "20+", label: "Clients Served" },

            { value: "114+", label: "NPM Downloads" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator - hidden on small screens */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-1.5 sm:p-2">
          <div className="w-1 h-1.5 sm:h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
