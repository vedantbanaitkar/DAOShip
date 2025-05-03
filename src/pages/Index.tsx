
import React from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorksSection from "@/components/how-it-works-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
