
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  Shield, 
  Volume2, 
  Heart,
  BarChart3,
  Info,
  Calendar
} from 'lucide-react';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  signal: 'buy' | 'sell' | 'wait';
  signalStrength: number;
  timeFrame: string;
  reasoning: string;
  targetPrice: number;
  stopLoss: number;
  volume: string;
  lastUpdate: Date;
  type: 'stock' | 'etf' | 'sovereign';
  sector: string;
  marketCap: string;
  holdingPeriod?: string;
}

interface EnhancedStockCardProps {
  stock: StockData;
  isFavorite?: boolean;
  onToggleFavorite?: (symbol: string) => void;
  onViewChart?: (symbol: string) => void;
}

const EnhancedStockCard = ({ 
  stock, 
  isFavorite = false, 
  onToggleFavorite,
  onViewChart 
}: EnhancedStockCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getSignalColor = () => {
    switch (stock.signal) {
      case 'buy': return 'bg-neon-green text-black';
      case 'sell': return 'bg-neon-pink text-black';
      case 'wait': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSignalText = () => {
    switch (stock.signal) {
      case 'buy': return '🚀 اشتر الآن';
      case 'sell': return '📉 بع الآن';
      case 'wait': return '⏳ انتظر';
      default: return 'غير محدد';
    }
  };

  const getGlowClass = () => {
    switch (stock.signal) {
      case 'buy': return 'glow-green border-neon-green/30';
      case 'sell': return 'glow-pink border-neon-pink/30';
      case 'wait': return 'border-gray-500/30';
      default: return 'border-white/10';
    }
  };

  const getPriceChangeColor = () => {
    return stock.change >= 0 ? 'text-neon-green' : 'text-neon-pink';
  };

  const getTypeIcon = () => {
    switch (stock.type) {
      case 'etf': return '🏦';
      case 'sovereign': return '👑';
      default: return '📈';
    }
  };

  const getTypeText = () => {
    switch (stock.type) {
      case 'etf': return 'صندوق استثماري';
      case 'sovereign': return 'صندوق سيادي';
      default: return 'سهم';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <Card className={`glass-effect p-6 transition-all duration-300 hover:scale-105 ${getGlowClass()} relative`}>
      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 p-1 hover:bg-white/10"
        onClick={() => onToggleFavorite?.(stock.symbol)}
      >
        <Heart 
          className={`w-4 h-4 transition-colors ${
            isFavorite ? 'fill-neon-pink text-neon-pink' : 'text-gray-400 hover:text-neon-pink'
          }`} 
        />
      </Button>

      {/* Stock Header */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
              {getTypeIcon()} {getTypeText()}
            </span>
          </div>
          <p className="text-sm text-gray-400">{stock.name}</p>
          <p className="text-xs text-gray-500">{stock.sector}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">${stock.price.toFixed(2)}</div>
          <div className={`text-sm font-medium ${getPriceChangeColor()}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </div>
          <div className="text-xs text-gray-500">القيمة السوقية: {stock.marketCap}</div>
        </div>
      </div>

      {/* Signal Badge */}
      <div className="mb-4">
        <Badge className={`${getSignalColor()} text-sm font-bold px-3 py-1 mb-2`}>
          {getSignalText()}
        </Badge>
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-400">قوة الإشارة:</span>
          <span className="text-white font-bold">{stock.signalStrength}%</span>
        </div>
        <Progress value={stock.signalStrength} className="h-2" />
      </div>

      {/* Time Frame */}
      <div className="flex items-center space-x-2 space-x-reverse mb-3 text-sm">
        <Clock className="w-4 h-4 text-neon-purple" />
        <span className="text-gray-400">الإطار الزمني:</span>
        <span className="text-neon-purple font-bold">{stock.timeFrame}</span>
        {stock.holdingPeriod && (
          <>
            <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-bold">{stock.holdingPeriod}</span>
          </>
        )}
      </div>

      {/* Targets and Levels */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 space-x-reverse">
            <Target className="w-4 h-4 text-neon-green" />
            <span className="text-gray-400">الهدف:</span>
          </div>
          <span className="text-neon-green font-bold">${stock.targetPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 space-x-reverse">
            <Shield className="w-4 h-4 text-neon-pink" />
            <span className="text-gray-400">وقف الخسارة:</span>
          </div>
          <span className="text-neon-pink font-bold">${stock.stopLoss.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 space-x-reverse">
            <Volume2 className="w-4 h-4 text-neon-purple" />
            <span className="text-gray-400">الحجم:</span>
          </div>
          <span className="text-neon-purple font-bold">{stock.volume}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 space-x-reverse mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
          onClick={() => onViewChart?.(stock.symbol)}
        >
          <BarChart3 className="w-4 h-4 ml-1" />
          عرض الشارت
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="px-3 hover:bg-white/10"
          onClick={() => setShowDetails(!showDetails)}
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>

      {/* Analysis Reasoning - Collapsible */}
      {showDetails && (
        <div className="mb-4 animate-fade-in">
          <h4 className="text-sm font-semibold text-white mb-2">تحليل الإشارة:</h4>
          <p className="text-xs text-gray-300 leading-relaxed bg-black/20 rounded-lg p-3">
            {stock.reasoning}
          </p>
        </div>
      )}

      {/* Last Update */}
      <div className="text-xs text-gray-500 text-center border-t border-white/10 pt-3">
        آخر تحديث: {formatTime(stock.lastUpdate)}
      </div>
    </Card>
  );
};

export default EnhancedStockCard;
