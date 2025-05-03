
import React from "react";
import { useNavigate } from "react-router-dom";
import GlassmorphicCard from "@/components/ui/glassmorphic-card";
import GradientButton from "@/components/ui/gradient-button";
import { Plus } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white/10 animate-particle-move"
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 20 + 10}s`,
          }}
        ></div>
      ))}

      <div className="container mx-auto px-4 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-float">
          DAOShip
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-daoship-text-gray max-w-3xl mx-auto">
          Create and deploy DAOs on Algorand in minutes
        </p>

        <GlassmorphicCard className="max-w-md mx-auto text-center p-8" glowEffect>
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Ready to launch your DAO?
          </h2>
          <p className="text-daoship-text-gray mb-8">
            Start building a community-driven organization on the Algorand blockchain. No coding required.
          </p>
          <GradientButton 
            onClick={() => navigate("/create-dao")} 
            className="w-full"
            glowEffect
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create a DAO
          </GradientButton>
        </GlassmorphicCard>
      </div>
    </div>
  );
};

export default HeroSection;
