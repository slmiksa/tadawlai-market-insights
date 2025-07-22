
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, X } from 'lucide-react';

interface ChartData {
  time: string;
  price: number;
  volume: number;
}

interface StockChartProps {
  symbol: string;
  onClose: () => void;
}

const StockChart = ({ symbol, onClose }: StockChartProps) => {
  // Mock chart data - in real app this would come from API
  const chartData: ChartData[] = Array.from({ length: 30 }, (_, i) => ({
    time: `${9 + Math.floor(i / 2)}:${(i % 2) * 30}`,
    price: 180 + Math.random() * 20 - 10 + Math.sin(i * 0.3) * 5,
    volume: Math.random() * 1000000
  }));

  const currentPrice = chartData[chartData.length - 1]?.price || 0;
  const previousPrice = chartData[chartData.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-effect w-full max-w-6xl h-[80vh] p-6 border-neon-purple/30 glow-purple relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <BarChart3 className="w-6 h-6 text-neon-purple" />
            <div>
              <h2 className="text-2xl font-bold text-white">{symbol}</h2>
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <span className="text-white font-bold">${currentPrice.toFixed(2)}</span>
                <span className={`flex items-center ${priceChange >= 0 ? 'text-neon-green' : 'text-neon-pink'}`}>
                  {priceChange >= 0 ? <TrendingUp className="w-4 h-4 ml-1" /> : <TrendingDown className="w-4 h-4 ml-1" />}
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Chart */}
        <div className="h-[60%] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Chart */}
        <div className="h-[20%]">
          <h4 className="text-sm font-semibold text-gray-400 mb-2">الحجم</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#10b981"
                strokeWidth={1}
                fill="url(#volumeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Technical Indicators */}
        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-xs text-gray-400">RSI</div>
            <div className="text-sm font-bold text-neon-purple">67.8</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">MACD</div>
            <div className="text-sm font-bold text-neon-green">+2.14</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">BB</div>
            <div className="text-sm font-bold text-yellow-400">متوسط</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">Vol</div>
            <div className="text-sm font-bold text-neon-pink">عالي</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockChart;
