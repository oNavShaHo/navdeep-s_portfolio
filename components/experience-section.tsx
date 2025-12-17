"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar } from "lucide-react"
import type * as THREE from "three"

const experiences = [
  {
    company: "Hello AR",
    role: "Software Engineer (Remote)",
    period: "April 2024 – November 2025",
    color: "#4ade80",
    achievements: [
      "Engineered Magic Media platform end-to-end (frontend, backend APIs, async workers), onboarding 20+ US clients",
      "Developed AI-driven content automation: fetches Instagram data, maps feature via embeddings, generates optimized video content, schedules posts at best-performing times",
      "Created RAG-powered semantic retrieval pipeline for accurate feature-to-media mapping and AI generation",
      "Delivered AR/WebAR solutions for top brands: project 3D models into real environments using Three.js and Web",
      "Optimized platform performance: multithreading, API optimization, and legacy 3D viewer maintenance",
      "Automated Instagram client outreach via Chrome extension, improving engagement efficiency by 200%",
    ],
    technologies: ["React.js", "Next.js", "Python", "Three.js", "WebGL", "Node.js", "RAG", "LLM", "Embeddings"],
  },
]

function ExperienceShape({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  )
}

function ExperienceCard({ experience, index }: { experience: (typeof experiences)[0]; index: number }) {
  return (
    <Card className="group relative overflow-hidden bg-card/50 border-border hover:border-primary/50 transition-all duration-500 backdrop-blur-sm">
      {/* 3D Background - hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 hidden sm:block">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color={experience.color} />
            <ExperienceShape color={experience.color} />
          </Suspense>
        </Canvas>
      </div>

      <CardContent className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">{experience.company}</h3>
            </div>
            <p className="text-base sm:text-lg text-primary font-medium">{experience.role}</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{experience.period}</span>
          </div>
        </div>

        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-secondary/50 text-foreground text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">Work Experience</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-3 sm:mb-4 text-balance">
            Professional Journey
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
            Building impactful solutions that serve clients across the globe, from the tranquil valleys of Uttarakhand.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4 sm:space-y-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
