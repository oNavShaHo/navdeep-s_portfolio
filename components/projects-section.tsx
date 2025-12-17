"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Package, Video, Ruler, Gamepad2 } from "lucide-react"
import type * as THREE from "three"

const projects = [
  {
    title: "Open World Portfolio",
    description:
      "Browser-based open-world first-person portfolio built with Blender + Three.js. An immersive 3D experience to explore my digital world.",
    icon: Gamepad2,
    color: "#4ade80",
    github: "https://github.com/oNavShaHo/3d_nav_porfolio",
    live: "https://3d-nav-porfolio.vercel.app/",
    period: "November 2024 - Ongoing",
    technologies: ["Three.js", "Blender", "JavaScript", "WebGL"],
  },
  {
    title: "ArDimensions",
    description:
      "Android AR app calculating real-world distances using SceneView + Euclidean distance. Detects horizontal planes and measures distances between selected points.",
    icon: Ruler,
    color: "#f97316",
    github: "https://github.com/oNavShaHo/ArDimensions",
    period: "May 2024",
    technologies: ["ARCore", "Kotlin", "SceneView", "Android"],
  },
  {
    title: "Moveefy",
    description:
      "Real-time synchronized movie-watching web app using WebSockets + Next.js. Optimized network latency and sync; delivered robust communication channel.",
    icon: Video,
    color: "#60a5fa",
    github: "https://github.com/oNavShaHo/moveefy_sync",
    live: "https://moveefy-sync.vercel.app/",
    period: "February - March 2024",
    technologies: ["Next.js", "WebSocket", "Real-time", "TypeScript"],
  },
  {
    title: "code-user-input",
    description:
      "Npm package for reusable JS input handling → 114 downloads first week. Provides 4 data type functions to easily take user input in JavaScript.",
    icon: Package,
    color: "#a78bfa",
    github: "https://github.com/oNavShaHo/user-input",
    live: "https://www.npmjs.com/package/code-user-input",
    period: "December 2023 - January 2024",
    technologies: ["Node.js", "NPM", "JavaScript", "CLI"],
  },
]

function ProjectShape({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial color={color} distort={0.25} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const Icon = project.icon

  return (
    <Card className="group relative overflow-hidden bg-card/50 border-border hover:border-primary/50 transition-all duration-500 backdrop-blur-sm h-full">
      {/* 3D Background - hidden on mobile */}
      <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500 hidden sm:block">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color={project.color} />
            <ProjectShape color={project.color} />
          </Suspense>
        </Canvas>
      </div>

      <CardContent className="relative z-10 p-4 sm:p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: project.color }} />
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{project.title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">{project.period}</p>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-secondary/50 text-foreground text-[10px] sm:text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">Projects</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-3 sm:mb-4 text-balance">
            {"Things I've Built"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
            From AR applications to real-time collaboration tools, here are some projects that showcase my journey.
          </p>
        </div>

        {/* Projects Grid - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
