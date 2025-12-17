"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Html } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Sparkles, Code, Palette, Rocket } from "lucide-react";
import type * as THREE from "three";

function FreelancingShape({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <MeshDistortMaterial
            color={color}
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      
      {/* Orbiting particles */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.1}
          rotationIntensity={0.8}
          floatIntensity={1.2}
        >
          <mesh
            position={[
              Math.cos((i * (Math.PI * 2)) / 8) * 2.5,
              Math.sin((i * (Math.PI * 2)) / 8) * 2.5,
              Math.sin(i * 0.8) * 0.5,
            ]}
          >
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4ade80" : "#f97316"}
              emissive={i % 2 === 0 ? "#4ade80" : "#f97316"}
              emissiveIntensity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Full-stack web applications with modern frameworks",
    color: "#4ade80",
  },
  {
    icon: Palette,
    title: "3D & AR Experiences",
    description: "Immersive 3D interfaces and AR applications",
    color: "#f97316",
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    description: "LLM-powered features and automation systems",
    color: "#60a5fa",
  },
  {
    icon: Rocket,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions",
    color: "#a78bfa",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const Icon = service.icon;

  return (
    <Card className="group relative overflow-hidden bg-card/50 border-border hover:border-primary/50 transition-all duration-500 backdrop-blur-sm h-full">
      <CardContent className="relative z-10 p-4 sm:p-6">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${service.color}20` }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: service.color }} />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>
      </CardContent>
    </Card>
  );
}

export function FreelancingSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="freelancing"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
            Available for Hire
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-3 sm:mb-4 text-balance">
            I Take Freelancing Work
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
            Looking for a developer to bring your vision to life? Let's collaborate on your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* 3D Visual */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] order-2 lg:order-1">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#4ade80" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f97316" />
                <pointLight position={[0, 10, -10]} intensity={0.6} color="#60a5fa" />
                <FreelancingShape color="#4ade80" />
                <Environment preset="forest" />
              </Suspense>
            </Canvas>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Let's Build Something Amazing
              </h3>
            </div>

            <p className="text-muted-foreground mb-6 text-base sm:text-lg">
              I specialize in creating cutting-edge digital experiences that combine
              beautiful design with powerful functionality. Whether you need a web app,
              mobile application, AR experience, or AI-powered solution, I'm here to help.
            </p>

            <div className="space-y-3 mb-6">
              {[
                "End-to-end project delivery",
                "Modern tech stack expertise",
                "Responsive communication",
                "Quality-focused development",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 group"
            >
              Start a Project
              <Briefcase className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

