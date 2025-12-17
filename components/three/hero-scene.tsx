"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function MountainPeaks() {
  const mountainsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (mountainsRef.current) {
      mountainsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  const createMountainGeometry = (height: number, radius: number) => {
    return new THREE.ConeGeometry(radius, height, 6, 1)
  }

  return (
    <group ref={mountainsRef} position={[0, -3, -8]}>
      {/* Main peak - Nanda Devi inspired */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[3, 6, 6]} />
        <meshStandardMaterial color="#1a3a2e" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[1.2, 1.5, 6]} />
        <meshStandardMaterial
          color="#e8f0f0"
          roughness={0.3}
          metalness={0.1}
          emissive="#e8f0f0"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Secondary peaks */}
      <mesh position={[-4, -0.5, 1]}>
        <coneGeometry args={[2.5, 5, 6]} />
        <meshStandardMaterial color="#2d4a3e" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[-4, 1.5, 1]}>
        <coneGeometry args={[1, 1.2, 6]} />
        <meshStandardMaterial color="#e8f0f0" roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh position={[4, -0.8, 0.5]}>
        <coneGeometry args={[2.2, 4.5, 6]} />
        <meshStandardMaterial color="#365a4a" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[4, 1.2, 0.5]}>
        <coneGeometry args={[0.9, 1, 6]} />
        <meshStandardMaterial color="#e8f0f0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Distant peaks */}
      <mesh position={[-7, -1.5, -2]}>
        <coneGeometry args={[2, 3.5, 6]} />
        <meshStandardMaterial color="#1a2a22" roughness={0.9} metalness={0.1} transparent opacity={0.7} />
      </mesh>
      <mesh position={[7, -1.2, -2]}>
        <coneGeometry args={[1.8, 3, 6]} />
        <meshStandardMaterial color="#1a2a22" roughness={0.9} metalness={0.1} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function PineTrees() {
  const treesRef = useRef<THREE.Group>(null)

  const treePositions = useMemo(
    () => [
      [-6, -4, -2],
      [-5, -4.2, 0],
      [-4, -4, 1],
      [4, -4.1, 1],
      [5, -4, 0],
      [6, -4.2, -1],
      [-3, -4.3, 2],
      [3, -4.2, 2],
    ],
    [],
  )

  return (
    <group ref={treesRef}>
      {treePositions.map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Trunk */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.6, 8]} />
            <meshStandardMaterial color="#4a3728" roughness={0.9} />
          </mesh>
          {/* Foliage layers */}
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.4, 0.8, 8]} />
            <meshStandardMaterial color="#1a4a2e" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[0.3, 0.6, 8]} />
            <meshStandardMaterial color="#2a5a3e" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.2, 0.4, 8]} />
            <meshStandardMaterial color="#3a6a4e" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function TechOrbs() {
  const orbsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={orbsRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 1, 2]}>
          <icosahedronGeometry args={[0.4, 1]} />
          <MeshDistortMaterial color="#4ade80" distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[3, 2, 1]}>
          <octahedronGeometry args={[0.35, 0]} />
          <MeshDistortMaterial color="#f97316" distort={0.4} speed={1.5} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[0, 3, 0]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <MeshDistortMaterial color="#60a5fa" distort={0.25} speed={2} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  )
}

function Fireflies() {
  const count = 100
  const particlesRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 8 - 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15

      // Warm golden/green colors like fireflies
      const colorChoice = Math.random()
      if (colorChoice > 0.5) {
        col[i * 3] = 1
        col[i * 3 + 1] = 0.85
        col[i * 3 + 2] = 0.3
      } else {
        col[i * 3] = 0.3
        col[i * 3 + 1] = 1
        col[i * 3 + 2] = 0.5
      }
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function TerrainPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]}>
      <planeGeometry args={[50, 50, 30, 30]} />
      <meshStandardMaterial color="#1a2a1e" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.15} color="#ffeedd" />
      <directionalLight position={[10, 15, 5]} intensity={1} color="#ffddaa" />
      <pointLight position={[-5, 8, 5]} intensity={0.5} color="#4ade80" />
      <pointLight position={[5, 5, 3]} intensity={0.3} color="#f97316" />

      {/* Fog for depth */}
      <fog attach="fog" args={["#0a1510", 8, 30]} />

      <MountainPeaks />
      <PineTrees />
      <TechOrbs />
      <Fireflies />
      <TerrainPlane />
    </>
  )
}
