import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, Users, Clock, CheckCircle, XCircle } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import GlassmorphicCard from "@/components/ui/glassmorphic-card";
import GradientButton from "@/components/ui/gradient-button";
import { getDAO, getDAOProposals } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  _id: string;
  title: string;
  description: string;
  status: string;
  startTime: string;
  endTime: string;
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
}

interface DAO {
  _id: string;
  name: string;
  description: string;
  members: any[];
  votingPeriod: number;
  quorum: number;
  createdAt: string;
}

const DAODashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [dao, setDao] = useState<DAO | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchDAOData();
    }
  }, [id]);

  const fetchDAOData = async () => {
    try {
      const [daoData, proposalsData] = await Promise.all([
        getDAO(id!),
        getDAOProposals(id),
      ]);
      console.log("daoData fetched");
      setDao(daoData);
      setProposals(proposalsData);
    } catch (error) {
      console.error("Error fetching DAO data:", error);
      toast({
        title: "Error",
        description: "Failed to load DAO data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <p className="text-white">Loading DAO data...</p>
      </div>
    );
  }

  if (!dao) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <GlassmorphicCard className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">DAO Not Found</h2>
          <p className="text-daoship-text-gray mb-6">
            We couldn't find the DAO you're looking for.
          </p>
          <Link to="/">
            <GradientButton>Return Home</GradientButton>
          </Link>
        </GlassmorphicCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                {dao.name}
              </h1>
              <p className="text-daoship-text-gray mt-2 max-w-2xl">
                {dao.description}
              </p>
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
          <div className="flex space-x-4 mb-8">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "overview"
                  ? "bg-gradient-primary text-white"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "proposals"
                  ? "bg-gradient-primary text-white"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab("proposals")}
            >
              Proposals
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "members"
                  ? "bg-gradient-primary text-white"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab("members")}
            >
              Members
            </button>
          </div>

          {/* Content */}
          {activeTab === "overview" && (
            <>
              {/* DAO Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <GlassmorphicCard className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    DAO Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Members</span>
                      <span className="text-white">{dao.members.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">
                        Voting Period
                      </span>
                      <span className="text-white">
                        {dao.votingPeriod} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Quorum</span>
                      <span className="text-white">{dao.quorum}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-daoship-text-gray">Created</span>
                      <span className="text-white">
                        {new Date(dao.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </GlassmorphicCard>
              </div>
            </>
          )}

          {activeTab === "proposals" && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Proposals</h2>

              {proposals.length > 0 ? (
                <div className="space-y-6">
                  {proposals.map((proposal) => (
                    <GlassmorphicCard key={proposal._id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {proposal.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            proposal.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : proposal.status === "passed"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {proposal.status.charAt(0).toUpperCase() +
                            proposal.status.slice(1)}
                        </span>
                      </div>

                      <p className="text-daoship-text-gray mb-4">
                        {proposal.description}
                      </p>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-white/70">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(proposal.startTime).toLocaleDateString()}{" "}
                            - {new Date(proposal.endTime).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-green-400">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>{proposal.yesVotes}</span>
                          </div>
                          <div className="flex items-center text-red-400">
                            <XCircle className="h-4 w-4 mr-1" />
                            <span>{proposal.noVotes}</span>
                          </div>
                        </div>
                      </div>
                    </GlassmorphicCard>
                  ))}
                </div>
              ) : (
                <GlassmorphicCard className="p-10 text-center">
                  <h3 className="text-xl font-medium text-white mb-2">
                    No Proposals Yet
                  </h3>
                  <p className="text-daoship-text-gray mb-6">
                    Be the first to create a proposal for this DAO.
                  </p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dao.members.map((member) => (
                  <GlassmorphicCard key={member._id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <span className="text-white font-medium">
                          {member.username?.charAt(0).toUpperCase() || "?"}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          {member.username || "Anonymous"}
                        </h3>
                        <p className="text-daoship-text-gray text-sm">
                          {member.walletAddress}
                        </p>
                      </div>
                    </div>
                  </GlassmorphicCard>
                ))}
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
