"use client"

import { Suspense, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Html } from "@react-three/drei"
import type * as THREE from "three"

const technologies = [
  { name: "Next.js", color: "#ffffff", position: [-3, 2.5, 0] as [number, number, number] },
  { name: "React.js", color: "#61dafb", position: [0, 3, 0] as [number, number, number] },
  { name: "Three.js", color: "#4ade80", position: [3, 2.5, 0] as [number, number, number] },
  { name: "Python", color: "#3776ab", position: [-3.5, 0.5, 0] as [number, number, number] },
  { name: "Blender", color: "#f5792a", position: [0, 0, 0] as [number, number, number] },
  { name: "Kotlin", color: "#7f52ff", position: [3.5, 0.5, 0] as [number, number, number] },
  { name: "JavaScript", color: "#f7df1e", position: [-2.5, -2, 0] as [number, number, number] },
  { name: "TypeScript", color: "#3178c6", position: [0, -2.5, 0] as [number, number, number] },
  { name: "v0", color: "#ffffff", position: [2.5, -2, 0] as [number, number, number] },
]

function TechNode({ name, color, position }: { name: string; color: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Html center distanceFactor={8} className="pointer-events-none">
          <div className="bg-card/80 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-border whitespace-nowrap">
            <span className="text-[10px] sm:text-xs font-medium text-foreground">{name}</span>
          </div>
        </Html>
      </group>
    </Float>
  )
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null)

  const positions = useMemo(() => {
    const connections: number[] = []
    technologies.forEach((tech, i) => {
      technologies.forEach((other, j) => {
        if (i < j && Math.random() > 0.5) {
          connections.push(...tech.position, ...other.position)
        }
      })
    })
    return new Float32Array(connections)
  }, [])

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#4ade80" transparent opacity={0.15} />
    </lineSegments>
  )
}

function TechScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <ConnectionLines />
      {technologies.map((tech) => (
        <TechNode key={tech.name} {...tech} />
      ))}
    </group>
  )
}

export function TechStackSection() {
  return (
    <section id="tech" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">Technical Skills</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-3 sm:mb-4 text-balance">
            My Tech Universe
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        {/* 3D Tech Stack - responsive height */}
        <div className="h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] relative">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#4ade80" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f97316" />
              <TechScene />
              <Environment preset="forest" />
            </Suspense>
          </Canvas>
        </div>

        {/* Additional Skills - responsive text and spacing */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">Also experienced with:</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {["RAG Pipelines", "LLM Integration", "Embeddings", "Prompt Engineering", "WebGL", "WebAR", "ARCore", "SceneView", "REST APIs", "Workers", "Multithreading", "Chrome Extensions", "npm", "Git", "CI/CD", "Agile/Scrum"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card border border-border text-xs sm:text-sm text-foreground"
                >
                  {skill}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
