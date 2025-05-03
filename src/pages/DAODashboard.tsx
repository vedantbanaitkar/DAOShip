
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import GlassmorphicCard from "@/components/ui/glassmorphic-card";
import GradientButton from "@/components/ui/gradient-button";
import { mockDAOs, mockProposals } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";
import { Plus, Users, Clock, Calendar, ExternalLink } from "lucide-react";

const DAODashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the current DAO
  const dao = mockDAOs.find(d => d.id === id);
  
  // Get proposals for this DAO
  const proposals = mockProposals.filter(p => p.daoId === id);
  
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!dao) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <GlassmorphicCard className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">DAO Not Found</h2>
          <p className="text-daoship-text-gray mb-6">We couldn't find the DAO you're looking for.</p>
          <Link to="/">
            <GradientButton>
              Return Home
            </GradientButton>
          </Link>
        </GlassmorphicCard>
      </div>
    );
  }

  // Format token supply with commas
  const formattedSupply = dao.tokenSupply.toLocaleString();
  
  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">{dao.name}</h1>
              <p className="text-daoship-text-gray mt-2 max-w-2xl">{dao.description}</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link to={`/dao/${id}/create-proposal`}>
                <GradientButton glowEffect>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Proposal
                </GradientButton>
              </Link>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-8">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "overview" 
                  ? "border-b-2 border-daoship-blue text-white" 
                  : "text-white/60 hover:text-white"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "proposals" 
                  ? "border-b-2 border-daoship-blue text-white" 
                  : "text-white/60 hover:text-white"
              }`}
              onClick={() => setActiveTab("proposals")}
            >
              Proposals
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "members" 
                  ? "border-b-2 border-daoship-blue text-white" 
                  : "text-white/60 hover:text-white"
              }`}
              onClick={() => setActiveTab("members")}
            >
              Members
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === "overview" && (
            <>
              {/* DAO Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <GlassmorphicCard className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">DAO Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Token Name</span>
                      <span className="text-white">{dao.tokenName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Symbol</span>
                      <span className="text-white font-medium">{dao.tokenSymbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Supply</span>
                      <span className="text-white">{formattedSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Created</span>
                      <span className="text-white">{new Date(dao.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </GlassmorphicCard>
                
                <GlassmorphicCard className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Governance Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Voting Period</span>
                      <span className="text-white">{dao.votingPeriod} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Quorum</span>
                      <span className="text-white">{dao.quorum}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Min. Tokens</span>
                      <span className="text-white">{dao.minTokens}</span>
                    </div>
                  </div>
                </GlassmorphicCard>
                
                <GlassmorphicCard className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Community Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-daoship-text-gray flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Members
                      </span>
                      <span className="text-white font-medium">{dao.membersCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-daoship-text-gray flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Active Proposals
                      </span>
                      <span className="text-white font-medium">{proposals.filter(p => p.status === "active").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-daoship-text-gray flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Completed Proposals
                      </span>
                      <span className="text-white font-medium">{proposals.filter(p => p.status === "completed").length}</span>
                    </div>
                  </div>
                </GlassmorphicCard>
              </div>
              
              {/* Recent Proposals */}
              <h2 className="text-2xl font-bold text-white mb-6">Recent Proposals</h2>
              
              {proposals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {proposals.slice(0, 2).map((proposal) => (
                    <Link to={`/proposal/${proposal.id}`} key={proposal.id}>
                      <GlassmorphicCard className="p-6 glass-card-hover">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-medium text-white">{proposal.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            proposal.status === "active" 
                              ? "bg-daoship-mint/20 text-daoship-mint" 
                              : proposal.status === "pending" 
                              ? "bg-daoship-yellow/20 text-daoship-yellow" 
                              : "bg-white/20 text-white"
                          }`}>
                            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                          </span>
                        </div>
                        
                        <p className="text-daoship-text-gray text-sm mb-4 line-clamp-2">
                          {proposal.description}
                        </p>
                        
                        <div className="mb-4">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-primary"
                              style={{ width: `${(proposal.yesVotes / proposal.totalVotes) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between mt-2 text-xs">
                            <span className="text-white">Yes: {Math.round((proposal.yesVotes / proposal.totalVotes) * 100)}%</span>
                            <span className="text-white">No: {Math.round((proposal.noVotes / proposal.totalVotes) * 100)}%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-daoship-text-gray">
                          <span>By {proposal.author.slice(0, 6)}...{proposal.author.slice(-4)}</span>
                          <span>Ends {new Date(proposal.endTime).toLocaleDateString()}</span>
                        </div>
                      </GlassmorphicCard>
                    </Link>
                  ))}
                </div>
              ) : (
                <GlassmorphicCard className="p-10 text-center">
                  <h3 className="text-xl font-medium text-white mb-2">No Proposals Yet</h3>
                  <p className="text-daoship-text-gray mb-6">Be the first to create a proposal for this DAO.</p>
                  <Link to={`/dao/${id}/create-proposal`}>
                    <GradientButton>
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Proposal
                    </GradientButton>
                  </Link>
                </GlassmorphicCard>
              )}
            </>
          )}
          
          {activeTab === "proposals" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">All Proposals</h2>
                <Link to={`/dao/${id}/create-proposal`}>
                  <GradientButton size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    New Proposal
                  </GradientButton>
                </Link>
              </div>
              
              {proposals.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {proposals.map((proposal) => (
                    <Link to={`/proposal/${proposal.id}`} key={proposal.id}>
                      <GlassmorphicCard className="p-6 glass-card-hover">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-white mb-1">{proposal.title}</h3>
                            <p className="text-daoship-text-gray text-sm mb-4 line-clamp-1">{proposal.description}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            proposal.status === "active" 
                              ? "bg-daoship-mint/20 text-daoship-mint" 
                              : proposal.status === "pending" 
                              ? "bg-daoship-yellow/20 text-daoship-yellow" 
                              : "bg-white/20 text-white"
                          }`}>
                            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-primary"
                              style={{ width: `${(proposal.yesVotes / proposal.totalVotes) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between mt-2 text-xs">
                            <span className="text-white">Yes: {Math.round((proposal.yesVotes / proposal.totalVotes) * 100)}%</span>
                            <span className="text-white">No: {Math.round((proposal.noVotes / proposal.totalVotes) * 100)}%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-daoship-text-gray">
                          <span>By {proposal.author.slice(0, 6)}...{proposal.author.slice(-4)}</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Ends {new Date(proposal.endTime).toLocaleDateString()}
                          </span>
                        </div>
                      </GlassmorphicCard>
                    </Link>
                  ))}
                </div>
              ) : (
                <GlassmorphicCard className="p-10 text-center">
                  <h3 className="text-xl font-medium text-white mb-2">No Proposals Yet</h3>
                  <p className="text-daoship-text-gray mb-6">Be the first to create a proposal for this DAO.</p>
                  <Link to={`/dao/${id}/create-proposal`}>
                    <GradientButton>
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Proposal
                    </GradientButton>
                  </Link>
                </GlassmorphicCard>
              )}
            </>
          )}
          
          {activeTab === "members" && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Members</h2>
              
              <GlassmorphicCard className="p-6 mb-6">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-medium text-white">Member Distribution</h3>
                  <span className="text-daoship-text-gray">Total: {dao.membersCount}</span>
                </div>
                
                <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-gradient-to-r from-daoship-purple to-daoship-blue w-3/4"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-xs text-daoship-text-gray">Top 10 Holders</p>
                    <p className="text-white font-medium">75%</p>
                  </div>
                  <div>
                    <p className="text-xs text-daoship-text-gray">Remaining</p>
                    <p className="text-white font-medium">25%</p>
                  </div>
                  <div>
                    <p className="text-xs text-daoship-text-gray">Active Voters</p>
                    <p className="text-white font-medium">52</p>
                  </div>
                  <div>
                    <p className="text-xs text-daoship-text-gray">Participation</p>
                    <p className="text-white font-medium">41%</p>
                  </div>
                </div>
              </GlassmorphicCard>
              
              {/* Mock member list */}
              <div className="glass-card rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-medium text-daoship-text-gray">Address</th>
                      <th className="text-right p-4 text-sm font-medium text-daoship-text-gray">Token Balance</th>
                      <th className="text-right p-4 text-sm font-medium text-daoship-text-gray">Voting Power</th>
                      <th className="text-right p-4 text-sm font-medium text-daoship-text-gray">Proposals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="border-b border-white/5">
                        <td className="p-4 text-sm">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-daoship-mint mr-2"></div>
                            <a href="#" className="text-white hover:text-daoship-blue flex items-center">
                              0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}
                              <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                            </a>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-white text-right">
                          {Math.floor(Math.random() * 100000).toLocaleString()} {dao.tokenSymbol}
                        </td>
                        <td className="p-4 text-sm text-white text-right">
                          {Math.floor(Math.random() * 15 + 1)}%
                        </td>
                        <td className="p-4 text-sm text-white text-right">
                          {Math.floor(Math.random() * 5)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DAODashboard;
