// src/pages/Index.tsx

// --- CORRECTED IMPORTS ---

// These files use "export function Name()" or "export const Name"
import { Navigation } from "@/components/Navigation"; // From .tsx
import { Hero } from "@/components/Hero";         // From .tsx
import { Reviews } from "@/components/Reviews";     // From .tsx

// This file uses "export function Component()"
import { Component as Footer } from "@/components/Footer"; // From .tsx

// This file uses "export default"
import Features from "@/components/Features"; // From .jsx

// --- YOUR COMPONENT ---

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Index;