
import React from "react";
import GlassmorphicCard from "@/components/ui/glassmorphic-card";
import { Settings, Vote, Shield } from "lucide-react";

const featuresData = [
  {
    title: "Simple Setup",
    description: "Launch your DAO in minutes with our intuitive interface. No coding needed.",
    icon: Settings,
  },
  {
    title: "Flexible Governance",
    description: "Customize voting periods, quorum percentages, and create proposals easily.",
    icon: Vote,
  },
  {
    title: "Secure on Algorand",
    description: "Built on the fast, secure, and sustainable Algorand blockchain.",
    icon: Shield,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <GlassmorphicCard
              key={index}
              className="p-8 text-center transform transition-all duration-300 hover:-translate-y-2 glass-card-hover"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-daoship-purple/20 p-4 rounded-full">
                  <feature.icon className="h-8 w-8 text-daoship-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-daoship-text-gray">{feature.description}</p>
            </GlassmorphicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
