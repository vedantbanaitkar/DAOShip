
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import GlassmorphicCard from "@/components/ui/glassmorphic-card";
import GradientButton from "@/components/ui/gradient-button";
import { mockProposals, mockDAOs } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, X, Clock, Calendar, User } from "lucide-react";

const ProposalView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  
  // Find the proposal
  const proposal = mockProposals.find(p => p.id === id);
  
  // If proposal exists, find its DAO
  const dao = proposal ? mockDAOs.find(d => d.id === proposal.daoId) : null;
  
  // Calculate time remaining
  const calculateTimeRemaining = () => {
    if (!proposal) return { days: 0, hours: 0, minutes: 0 };
    
    const now = new Date();
    const endTime = new Date(proposal.endTime);
    const timeRemaining = endTime.getTime() - now.getTime();
    
    if (timeRemaining <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };
  
  const timeRemaining = calculateTimeRemaining();
  
  // Handle voting
  const handleVote = (vote: "yes" | "no") => {
    setIsVoting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVoting(false);
      setHasVoted(true);
      
      toast({
        title: "Vote Submitted",
        description: `You have voted ${vote.toUpperCase()} on this proposal.`,
      });
    }, 1500);
  };
  
  if (!proposal || !dao) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <GlassmorphicCard className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Proposal Not Found</h2>
          <p className="text-daoship-text-gray mb-6">We couldn't find the proposal you're looking for.</p>
          <GradientButton onClick={() => navigate("/")}>
            Return Home
          </GradientButton>
        </GlassmorphicCard>
      </div>
    );
  }
  
  // Calculate vote percentages
  const yesPercentage = Math.round((proposal.yesVotes / proposal.totalVotes) * 100);
  const noPercentage = Math.round((proposal.noVotes / proposal.totalVotes) * 100);
  
  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Link to={`/dao/${dao.id}`} className="text-white flex items-center hover:text-daoship-blue transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {dao.name}
            </Link>
          </div>
          
          {/* Proposal Header */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{proposal.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-daoship-text-gray">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{proposal.author.slice(0, 6)}...{proposal.author.slice(-4)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Created {new Date(proposal.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    proposal.status === "active" 
                      ? "bg-daoship-mint/20 text-daoship-mint" 
                      : proposal.status === "pending" 
                      ? "bg-daoship-yellow/20 text-daoship-yellow" 
                      : "bg-white/20 text-white"
                  }`}>
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Time Remaining */}
            <GlassmorphicCard className="p-4 flex items-center">
              <Clock className="h-5 w-5 text-daoship-blue mr-3" />
              <div>
                <p className="text-sm text-daoship-text-gray">Time Remaining</p>
                <p className="text-white font-medium">
                  {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
                </p>
              </div>
            </GlassmorphicCard>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Proposal Details */}
            <div className="md:col-span-2">
              <GlassmorphicCard className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                <div className="text-daoship-text-gray space-y-4 whitespace-pre-wrap">
                  <p>{proposal.description}</p>
                </div>
              </GlassmorphicCard>
            </div>
            
            {/* Voting Section */}
            <div>
              <GlassmorphicCard className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Voting</h2>
                
                {/* Vote Visualization */}
                <div className="mb-6">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-daoship-mint">{yesPercentage}% Yes</span>
                    <span className="text-daoship-red">{noPercentage}% No</span>
                  </div>
                  
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-daoship-mint h-full"
                      style={{ width: `${yesPercentage}%` }}
                    ></div>
                    <div 
                      className="bg-daoship-red h-full"
                      style={{ width: `${noPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-daoship-text-gray">
                    <span>{proposal.yesVotes.toLocaleString()} votes</span>
                    <span>{proposal.noVotes.toLocaleString()} votes</span>
                  </div>
                </div>
                
                {/* Vote Buttons */}
                {!hasVoted ? (
                  <div className="grid grid-cols-2 gap-4">
                    <GradientButton
                      variant="success"
                      onClick={() => handleVote("yes")}
                      disabled={isVoting}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Vote Yes
                    </GradientButton>
                    
                    <GradientButton
                      variant="destructive"
                      onClick={() => handleVote("no")}
                      disabled={isVoting}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Vote No
                    </GradientButton>
                  </div>
                ) : (
                  <div className="glass-card p-4 rounded-lg text-center">
                    <div className="text-daoship-mint mb-2 flex items-center justify-center">
                      <Check className="h-5 w-5 mr-2" />
                      <span className="font-medium">Vote Recorded</span>
                    </div>
                    <p className="text-sm text-daoship-text-gray">
                      Thank you for participating in the DAO's governance
                    </p>
                  </div>
                )}
              </GlassmorphicCard>
              
              {/* Proposal Details */}
              <GlassmorphicCard className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Details</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-daoship-text-gray">Proposal ID</span>
                    <span className="text-white">{proposal.id}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-daoship-text-gray">DAO</span>
                    <span className="text-white">{dao.name}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-daoship-text-gray">Created</span>
                    <span className="text-white">{new Date(proposal.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-daoship-text-gray">Ends</span>
                    <span className="text-white">{new Date(proposal.endTime).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-daoship-text-gray">Total Votes</span>
                    <span className="text-white">{proposal.totalVotes.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-daoship-text-gray">Quorum</span>
                    <span className="text-white">{dao.quorum}%</span>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProposalView;
