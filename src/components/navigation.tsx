
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import GradientButton from "@/components/ui/gradient-button";
import { useToast } from "@/hooks/use-toast";
import { Wallet } from "lucide-react";
import WalletConnectModal from "@/components/wallet-connect-modal";

const Navigation = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock wallet connection, in reality this would integrate with Algorand wallets
  const handleWalletConnect = (walletType: string) => {
    setIsModalOpen(false);
    
    // Mock connecting wallet
    setTimeout(() => {
      const mockAddress = "ALGO12345...6789";
      setWalletAddress(mockAddress);
      setIsConnected(true);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletType}`,
      });
    }, 1000);
  };

  return (
    <nav className="w-full backdrop-blur-lg bg-black/20 fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white flex items-center">
          <span className="gradient-text">DAOShip</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-daoship-blue transition-colors">Home</Link>
          <Link to="/explore" className="text-white hover:text-daoship-blue transition-colors">Explore</Link>
          
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-daoship-mint animate-pulse"></div>
              <span className="text-white">{walletAddress}</span>
            </div>
          ) : (
            <GradientButton onClick={() => setIsModalOpen(true)}>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </GradientButton>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-gradient-background backdrop-blur-lg",
        isOpen ? "block" : "hidden"
      )}>
        <div className="px-4 py-4 space-y-4 glass-card rounded-none">
          <Link to="/" className="block text-white hover:text-daoship-blue transition-colors">Home</Link>
          <Link to="/explore" className="block text-white hover:text-daoship-blue transition-colors">Explore</Link>
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-daoship-mint animate-pulse"></div>
              <span className="text-white">{walletAddress}</span>
            </div>
          ) : (
            <GradientButton onClick={() => setIsModalOpen(true)} className="w-full">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </GradientButton>
          )}
        </div>
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConnect={handleWalletConnect} />
    </nav>
  );
};

export default Navigation;
