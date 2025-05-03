
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import GlassmorphicCard from "@/components/ui/glassmorphic-card";
import GlassmorphicInput from "@/components/ui/glassmorphic-input";
import GlassmorphicTextarea from "@/components/ui/glassmorphic-textarea";
import GlassmorphicSlider from "@/components/ui/glassmorphic-slider";
import GradientButton from "@/components/ui/gradient-button";
import { useToast } from "@/hooks/use-toast";
import { mockDAOs } from "@/data/mock-data";

const CreateProposal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Find the current DAO
  const dao = mockDAOs.find(d => d.id === id);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    votingPeriod: dao?.votingPeriod || 7,
  });
  
  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Proposal Created",
        description: "Your proposal has been submitted to the DAO.",
      });
      
      // Navigate back to the DAO dashboard
      navigate(`/dao/${id}`);
    }, 2000);
  };
  
  if (!dao) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <GlassmorphicCard className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">DAO Not Found</h2>
          <p className="text-daoship-text-gray mb-6">We couldn't find the DAO you're looking for.</p>
          <GradientButton onClick={() => navigate("/")}>
            Return Home
          </GradientButton>
        </GlassmorphicCard>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Create Proposal
          </h1>
          <p className="text-daoship-text-gray mb-10">
            For {dao.name} ({dao.tokenSymbol})
          </p>
          
          <GlassmorphicCard className="p-8" glowEffect>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <GlassmorphicInput
                  label="Proposal Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Give your proposal a clear, descriptive title"
                  required
                />
                
                <GlassmorphicTextarea
                  label="Proposal Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your proposal in detail, including its purpose, implementation plan, and expected outcomes..."
                  className="min-h-[200px]"
                  required
                />
                
                <GlassmorphicSlider
                  label="Voting Period"
                  min={1}
                  max={dao.votingPeriod}
                  value={formData.votingPeriod}
                  onChange={(value) => setFormData({ ...formData, votingPeriod: value })}
                  unit=" days"
                />
                
                <div className="p-4 glass-card rounded-lg mt-2">
                  <p className="text-sm text-daoship-text-gray">
                    <span className="text-daoship-blue font-medium">Note:</span> Proposals require a minimum quorum of {dao.quorum}% to be valid. The maximum voting period for this DAO is {dao.votingPeriod} days.
                  </p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <GradientButton
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    glowEffect
                  >
                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                  </GradientButton>
                </div>
              </div>
            </form>
          </GlassmorphicCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateProposal;
