
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Filter } from 'lucide-react';
import EnhancedStockCard from './EnhancedStockCard';

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

interface FavoritesManagerProps {
  allStocks: StockData[];
  onViewChart: (symbol: string) => void;
}

const FavoritesManager = ({ allStocks, onViewChart }: FavoritesManagerProps) => {
  const [favorites, setFavorites] = useState<string[]>(['AAPL', 'NVDA']); // Default favorites
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'wait'>('all');

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const favoriteStocks = allStocks.filter(stock => favorites.includes(stock.symbol));
  
  const filteredFavorites = filter === 'all' 
    ? favoriteStocks 
    : favoriteStocks.filter(stock => stock.signal === filter);

  const getFilterButtonClass = (filterType: typeof filter) => {
    const baseClass = "px-4 py-2 rounded-lg text-sm font-medium transition-colors";
    return filter === filterType 
      ? `${baseClass} bg-neon-purple text-white`
      : `${baseClass} bg-gray-700 text-gray-300 hover:bg-gray-600`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Heart className="w-6 h-6 text-neon-pink" />
          <h2 className="text-2xl font-bold text-white">المفضلة</h2>
          <span className="bg-neon-purple/20 text-neon-purple px-2 py-1 rounded-full text-sm">
            {favorites.length}
          </span>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex space-x-1 space-x-reverse">
            <button 
              className={getFilterButtonClass('all')}
              onClick={() => setFilter('all')}
            >
              الكل
            </button>
            <button 
              className={getFilterButtonClass('buy')}
              onClick={() => setFilter('buy')}
            >
              شراء
            </button>
            <button 
              className={getFilterButtonClass('sell')}
              onClick={() => setFilter('sell')}
            >
              بيع
            </button>
            <button 
              className={getFilterButtonClass('wait')}
              onClick={() => setFilter('wait')}
            >
              انتظار
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <Card className="glass-effect p-12 text-center border-gray-700">
          <Heart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">لا توجد أسهم مفضلة</h3>
          <p className="text-gray-500 mb-4">أضف الأسهم إلى مفضلتك لمتابعتها بسهولة</p>
        </Card>
      )}

      {/* Filtered Empty State */}
      {favorites.length > 0 && filteredFavorites.length === 0 && (
        <Card className="glass-effect p-8 text-center border-gray-700">
          <Filter className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">لا توجد أسهم بهذا الفلتر</h3>
          <p className="text-gray-500">جرب فلتر آخر أو أضف المزيد من الأسهم</p>
        </Card>
      )}

      {/* Favorites Grid */}
      {filteredFavorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((stock) => (
            <EnhancedStockCard
              key={stock.symbol}
              stock={stock}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              onViewChart={onViewChart}
            />
          ))}
        </div>
      )}

      {/* Quick Add Suggestions */}
      {favorites.length < 3 && (
        <Card className="glass-effect p-4 border-neon-purple/30">
          <h4 className="text-sm font-semibold text-white mb-3">اقتراحات للإضافة:</h4>
          <div className="flex flex-wrap gap-2">
            {allStocks
              .filter(stock => !favorites.includes(stock.symbol))
              .slice(0, 5)
              .map(stock => (
                <Button
                  key={stock.symbol}
                  variant="outline"
                  size="sm"
                  className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
                  onClick={() => toggleFavorite(stock.symbol)}
                >
                  <Star className="w-3 h-3 ml-1" />
                  {stock.symbol}
                </Button>
              ))
            }
          </div>
        </Card>
      )}
    </div>
  );
};

export default FavoritesManager;
