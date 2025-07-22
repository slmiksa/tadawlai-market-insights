
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface AnalysisCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  glowColor?: 'green' | 'pink' | 'purple';
  children?: ReactNode;
}

const AnalysisCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  glowColor,
  children 
}: AnalysisCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-neon-green';
      case 'down': return 'text-neon-pink';
      default: return 'text-gray-400';
    }
  };

  const getGlowClass = () => {
    switch (glowColor) {
      case 'green': return 'glow-green border-neon-green/30';
      case 'pink': return 'glow-pink border-neon-pink/30';
      case 'purple': return 'glow-purple border-neon-purple/30';
      default: return 'border-white/10';
    }
  };

  return (
    <Card className={`glass-effect p-6 transition-all duration-300 hover:scale-105 ${getGlowClass()}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      
      <div className="space-y-2">
        <div className={`text-2xl font-bold ${getTrendColor()}`}>
          {value}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-400">{subtitle}</p>
        )}
      </div>
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </Card>
  );
};

export default AnalysisCard;
