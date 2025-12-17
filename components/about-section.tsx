"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const highlights = [
  "AR/VR & 3D Development Expert",
  "Full-stack Web Applications",
  "Mobile App Development",
  "High-ownership Delivery",
  "Problem Solver",
  "VIT Bhopal Graduate (8.31 CGPA)",
];

/* ============================
   LUCY MODEL (PLY)
============================ */
function LucyModel() {
  const geometry = useLoader(PLYLoader, "/models/Lucy100k.ply");

  // PLY needs manual normal computation
  useMemo(() => {
    geometry.computeVertexNormals();
  }, [geometry]);

  return (
    <mesh
      geometry={geometry}
      scale={0.0024}
      rotation={[0, -Math.PI / 2, 0]}
      position={[0, 0.8, 0]}
      castShadow
      receiveShadow
    >
      <meshLambertMaterial color={0xffffff} />
    </mesh>
  );
}

/* ============================
   SPOTLIGHT SCENE
============================ */
function SpotlightScene() {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() / 1.5;
    if (spotLightRef.current) {
      spotLightRef.current.position.x = Math.cos(t) * 2.5;
      spotLightRef.current.position.z = Math.sin(t) * 2.5;
    }
  });

  return (
    <>
      {/* Hemisphere / ambient */}
      <hemisphereLight args={[0xffffff, 0x8d8d8d, 0.25]} />

      {/* Moving spotlight */}
      <spotLight
        ref={spotLightRef}
        position={[2.5, 5, 2.5]}
        angle={Math.PI / 6}
        penumbra={1}
        intensity={100}
        decay={2}
        distance={0}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.003}
      />

      {/* Ground plane */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshLambertMaterial color={0xbcbcbc} />
      </mesh>

      {/* Lucy */}
      <LucyModel />
    </>
  );
}

/* ============================
   ABOUT SECTION
============================ */
export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* 3D CANVAS */}
          <div className="relative h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] order-2 lg:order-1 w-full">
            <Canvas
              shadows
              camera={{ position: [7, 4, 1], fov: 40 }}
              gl={{
                antialias: true,
                toneMapping: THREE.NeutralToneMapping,
              }}
            >
              <Suspense fallback={null}>
                <SpotlightScene />

                <OrbitControls
                  target={[0, 1, 0]}
                  minDistance={2}
                  maxDistance={10}
                  maxPolarAngle={Math.PI / 2}
                  enablePan={false}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* CONTENT */}
          <div className="order-1 lg:order-2 px-2 sm:px-0">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider block mb-2 sm:mb-3">
              About Me
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
              Crafting Digital Experiences
            </h2>

            <p className="text-muted-foreground mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
              Design-driven software engineer with expertise in AI-powered media
              systems, AR/3D experiences, and full-stack platforms. Proven
              ability to deliver end-to-end products combining LLMs, retrieval
              pipelines, and automation to drive measurable user engagement and
              business impact.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base leading-relaxed">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <Button
              className="group w-full sm:w-auto text-sm sm:text-base"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume/resume.pdf";
                link.download = "Navdeep_Shah_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Resume
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
