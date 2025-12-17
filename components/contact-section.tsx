"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import type * as THREE from "three";

function MandalaScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central lotus-inspired shape */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <MeshDistortMaterial
            color="#4ade80"
            distort={0.2}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </Float>

      {/* Orbiting elements - representing connectivity */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Float
          key={i}
          speed={1 + i * 0.2}
          rotationIntensity={0.5}
          floatIntensity={1}
        >
          <mesh
            position={[
              Math.cos((i * (Math.PI * 2)) / 6) * 3,
              Math.sin((i * (Math.PI * 2)) / 6) * 3,
              Math.sin(i * 0.5) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4ade80" : "#f97316"}
              emissive={i % 2 === 0 ? "#4ade80" : "#f97316"}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "navdeepshahof@gmail.com",
    href: "mailto:navdeepshahof@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7830708045",
    href: "tel:+917830708045",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dehradun, Uttarakhand",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/navdeep-shah-a56982207",
    label: "LinkedIn",
  },
  { icon: Github, href: "https://github.com/oNavShaHo", label: "GitHub" },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-background to-background" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-3 sm:mb-4 text-balance">
            {"Let's Connect"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
            {
              "Whether you have a project in mind or just want to say hello, I'd love to hear from you."
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 3D Visual - show on tablets too, hide only on mobile */}
          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] hidden md:block">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight
                  position={[10, 10, 10]}
                  intensity={1}
                  color="#4ade80"
                />
                <pointLight
                  position={[-10, -10, -10]}
                  intensity={0.5}
                  color="#f97316"
                />
                <MandalaScene />
                <Environment preset="forest" />
              </Suspense>
            </Canvas>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 border-border backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2 block">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2 block">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2 block">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2 block">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={4}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Contact Info - responsive layout */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href || "#"}
                      className={`flex items-center gap-2 sm:gap-3 ${
                        info.href ? "hover:text-primary transition-colors" : ""
                      }`}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {info.label}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 sm:gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
