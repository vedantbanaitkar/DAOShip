
import React from "react";

const steps = [
  {
    number: "01",
    title: "Connect Your Wallet",
    description: "Link your Algorand wallet to get started with DAOShip.",
  },
  {
    number: "02",
    title: "Create Your DAO",
    description: "Set up governance parameters and issue your token.",
  },
  {
    number: "03",
    title: "Start Governing",
    description: "Create proposals and vote on important decisions.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Line connecting steps (except for the last one) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-6 w-12 h-0.5 bg-gradient-to-r from-daoship-purple/80 to-transparent"></div>
              )}
              
              <div className="flex flex-col items-center">
                <div className="bg-gradient-primary rounded-full w-24 h-24 flex items-center justify-center mb-6 glow-border">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-center">{step.title}</h3>
                <p className="text-daoship-text-gray text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
