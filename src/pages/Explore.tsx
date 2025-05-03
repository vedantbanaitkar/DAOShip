
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import GlassmorphicCard from "@/components/ui/glassmorphic-card";
import GradientButton from "@/components/ui/gradient-button";
import { mockDAOs } from "@/data/mock-data";
import { Search, Users, Check } from "lucide-react";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter DAOs based on search term
  const filteredDAOs = mockDAOs.filter(
    dao => dao.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           dao.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                Explore DAOs
              </h1>
              <p className="text-daoship-text-gray">
                Discover and join Algorand DAOs created with DAOShip
              </p>
            </div>
            
            <Link to="/create-dao">
              <GradientButton className="mt-4 md:mt-0">
                Create DAO
              </GradientButton>
            </Link>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/50" />
              </div>
              <input
                type="text"
                placeholder="Search DAOs..."
                className="glass-input rounded-lg py-4 px-12 w-full text-white focus:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* DAO Grid */}
          {filteredDAOs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDAOs.map(dao => (
                <Link to={`/dao/${dao.id}`} key={dao.id}>
                  <GlassmorphicCard className="p-6 h-full flex flex-col justify-between glass-card-hover">
                    <div>
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold text-white mb-2">{dao.name}</h2>
                        <span className="bg-white/10 text-white px-2 py-1 rounded text-xs">
                          {dao.tokenSymbol}
                        </span>
                      </div>
                      <p className="text-daoship-text-gray mb-4 line-clamp-3">{dao.description}</p>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4 mt-auto">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-daoship-text-gray">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{dao.membersCount} members</span>
                        </div>
                        <div className="flex items-center text-daoship-text-gray">
                          <Check className="h-4 w-4 mr-1" />
                          <span>{dao.votingPeriod}d voting</span>
                        </div>
                      </div>
                    </div>
                  </GlassmorphicCard>
                </Link>
              ))}
            </div>
          ) : (
            <GlassmorphicCard className="p-10 text-center">
              <h3 className="text-xl font-medium text-white mb-2">No DAOs Found</h3>
              <p className="text-daoship-text-gray mb-6">We couldn't find any DAOs matching your search.</p>
              {searchTerm && (
                <GradientButton onClick={() => setSearchTerm("")}>
                  Clear Search
                </GradientButton>
              )}
            </GlassmorphicCard>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
