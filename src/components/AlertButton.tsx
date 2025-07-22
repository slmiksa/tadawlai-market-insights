
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface AlertButtonProps {
  type: 'buy' | 'sell' | 'wait';
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const AlertButton = ({ type, children, onClick, isActive, className = '' }: AlertButtonProps) => {
  const getButtonStyles = () => {
    switch (type) {
      case 'buy':
        return isActive 
          ? 'bg-neon-green text-black font-bold glow-green animate-pulse-glow'
          : 'bg-neon-green/20 border border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-black';
      case 'sell':
        return isActive 
          ? 'bg-neon-pink text-black font-bold glow-pink animate-pulse-glow'
          : 'bg-neon-pink/20 border border-neon-pink/50 text-neon-pink hover:bg-neon-pink hover:text-black';
      case 'wait':
        return isActive 
          ? 'bg-gray-500 text-white font-bold'
          : 'bg-gray-500/20 border border-gray-500/50 text-gray-400 hover:bg-gray-500 hover:text-white';
      default:
        return 'bg-gray-500/20 border border-gray-500/50 text-gray-400';
    }
  };

  return (
    <Button
      onClick={onClick}
      className={`w-full py-6 text-lg font-bold transition-all duration-300 ${getButtonStyles()} ${className}`}
    >
      {children}
    </Button>
  );
};

export default AlertButton;
