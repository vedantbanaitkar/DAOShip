
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GlassmorphicCard from "@/components/ui/glassmorphic-card";
import GradientButton from "@/components/ui/gradient-button";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

const WalletConnectModal = ({ isOpen, onClose, onConnect }: WalletConnectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-none shadow-none max-w-md p-0">
        <GlassmorphicCard className="p-6" glowEffect>
          <h2 className="text-2xl font-bold text-center mb-6 gradient-text">Connect Your Wallet</h2>
          
          <div className="space-y-4">
            <button 
              onClick={() => onConnect("Pera Wallet")} 
              className="glass-card glass-card-hover rounded-lg p-4 w-full flex items-center justify-between"
            >
              <span className="text-white font-medium">Pera Wallet</span>
              <img 
                src="https://perawallet.app/static/pera-logo-white-507fcc6247a7ce2f942da7b0e716c4ad.svg" 
                alt="Pera Wallet" 
                className="h-8 w-8" 
              />
            </button>
            
            <button 
              onClick={() => onConnect("WalletConnect")} 
              className="glass-card glass-card-hover rounded-lg p-4 w-full flex items-center justify-between"
            >
              <span className="text-white font-medium">WalletConnect</span>
              <img 
                src="https://walletconnect.com/_next/static/media/Logo.58c595f2.svg" 
                alt="WalletConnect" 
                className="h-6 w-auto" 
              />
            </button>
            
            <div className="pt-4">
              <GradientButton variant="secondary" className="w-full" onClick={onClose}>
                Cancel
              </GradientButton>
            </div>
          </div>
        </GlassmorphicCard>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectModal;
