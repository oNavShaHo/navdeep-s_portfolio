"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Glasses, Box, Globe, Smartphone, Cloud, Code } from "lucide-react"
import type * as THREE from "three"

const services = [
  {
    icon: Glasses,
    title: "AR/VR Development",
    description:
      "Immersive augmented and virtual reality experiences that transform how users interact with your brand.",
    color: "#4ade80",
  },
  {
    icon: Box,
    title: "3D Development",
    description: "Stunning 3D visuals, animations, and interactive experiences using cutting-edge WebGL technology.",
    color: "#22d3ee",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive web applications built with the latest frameworks and best practices.",
    color: "#a78bfa",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    color: "#f472b6",
  },
  {
    icon: Cloud,
    title: "AWS & Cloud",
    description: "Scalable cloud infrastructure and DevOps solutions powered by Amazon Web Services.",
    color: "#fb923c",
  },
  {
    icon: Code,
    title: "Custom Solutions",
    description: "Tailored software solutions designed to solve your unique business challenges.",
    color: "#facc15",
  },
]

function ServiceShape({ color }: { color: string }) {
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
        <MeshDistortMaterial color={color} attach="material" distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  )
}

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const Icon = service.icon

  return (
    <Card className="group relative overflow-hidden bg-card/50 border-border hover:border-primary/50 transition-all duration-500 backdrop-blur-sm">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color={service.color} />
            <ServiceShape color={service.color} />
          </Suspense>
        </Canvas>
      </div>

      <CardContent className="relative z-10 p-6">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${service.color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color: service.color }} />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
      </CardContent>
    </Card>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4 text-balance">What We Create</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            From concept to deployment, we deliver cutting-edge digital solutions that push the boundaries of what's
            possible.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
