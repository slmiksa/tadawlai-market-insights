
import { useState, useEffect } from 'react';
import EnhancedStockCard from '@/components/EnhancedStockCard';
import FavoritesManager from '@/components/FavoritesManager';
import StockChart from '@/components/StockChart';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  AlertTriangle, 
  Zap, 
  Clock,
  Star,
  BarChart3,
  Filter,
  Eye
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type RiskLevel = 'منخفض' | 'متوسط' | 'مرتفع';

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

const HomePage = () => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [stocksData, setStocksData] = useState<StockData[]>([
    // Tech Stocks
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 185.64,
      change: 2.45,
      changePercent: 1.34,
      signal: 'buy' as const,
      signalStrength: 85,
      timeFrame: '5-15 دقيقة',
      reasoning: 'كسر مقاومة قوية عند 184$، سيولة عالية، تدفق أموال إيجابي مع أخبار إيجابية عن iPhone 15',
      targetPrice: 188.50,
      stopLoss: 183.20,
      volume: '45.2M',
      lastUpdate: new Date(),
      type: 'stock',
      sector: 'التكنولوجيا',
      marketCap: '2.9T'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      price: 745.23,
      change: 8.77,
      changePercent: 1.19,
      signal: 'buy' as const,
      signalStrength: 92,
      timeFrame: '2-7 دقائق',
      reasoning: 'اختراق قوي فوق 740$، حجم تداول ضخم، أخبار إيجابية عن الذكاء الاصطناعي وطلب قوي على chips',
      targetPrice: 755.00,
      stopLoss: 742.00,
      volume: '67.8M',
      lastUpdate: new Date(),
      type: 'stock',
      sector: 'أشباه الموصلات',
      marketCap: '1.8T'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: 412.88,
      change: 1.15,
      changePercent: 0.28,
      signal: 'wait' as const,
      signalStrength: 45,
      timeFrame: 'انتظار',
      reasoning: 'حركة جانبية بين 410-415$، انتظار كسر أحد المستويات، أخبار Azure إيجابية لكن السوق متردد',
      targetPrice: 415.00,
      stopLoss: 410.00,
      volume: '22.1M',
      lastUpdate: new Date(),
      type: 'stock',
      sector: 'البرمجيات',
      marketCap: '3.1T'
    },

    // Financial Stocks
    {
      symbol: 'JPM',
      name: 'JPMorgan Chase',
      price: 165.42,
      change: -1.23,
      changePercent: -0.74,
      signal: 'sell' as const,
      signalStrength: 68,
      timeFrame: '10-20 دقيقة',
      reasoning: 'ضغط بيع بعد نتائج الأرباح، مخاوف من أسعار الفائدة، كسر دعم 166$',
      targetPrice: 162.50,
      stopLoss: 167.80,
      volume: '18.5M',
      lastUpdate: new Date(),
      type: 'stock',
      sector: 'البنوك',
      marketCap: '481B'
    },

    // ETFs
    {
      symbol: 'SPY',
      name: 'SPDR S&P 500 ETF',
      price: 445.67,
      change: 0.89,
      changePercent: 0.20,
      signal: 'buy' as const,
      signalStrength: 75,
      timeFrame: '15-30 دقيقة',
      reasoning: 'صعود فوق المتوسط المتحرك 50، قوة السوق العام، دعم من القطاعات التقنية',
      targetPrice: 448.00,
      stopLoss: 443.50,
      volume: '89.2M',
      lastUpdate: new Date(),
      type: 'etf',
      sector: 'مؤشرات السوق',
      marketCap: '442B',
      holdingPeriod: '3-7 أيام'
    },

    // Sovereign Funds Related
    {
      symbol: 'QQQ',
      name: 'Invesco QQQ Trust',
      price: 378.45,
      change: 2.34,
      changePercent: 0.62,
      signal: 'buy' as const,
      signalStrength: 88,
      timeFrame: '8-15 دقيقة',
      reasoning: 'قوة في أسهم التكنولوجيا، اختراق مقاومة 377$، حجم تداول مرتفع من المؤسسات',
      targetPrice: 382.00,
      stopLoss: 375.50,
      volume: '72.1M',
      lastUpdate: new Date(),
      type: 'etf',
      sector: 'التكنولوجيا',
      marketCap: '194B',
      holdingPeriod: '2-5 أيام'
    },

    // Energy
    {
      symbol: 'XOM',
      name: 'Exxon Mobil Corp.',
      price: 108.76,
      change: -0.87,
      changePercent: -0.79,
      signal: 'wait' as const,
      signalStrength: 42,
      timeFrame: 'انتظار',
      reasoning: 'تقلبات أسعار النفط، انتظار وضوح اتجاه السوق، مقاومة عند 110$',
      targetPrice: 110.50,
      stopLoss: 106.00,
      volume: '15.8M',
      lastUpdate: new Date(),
      type: 'stock',
      sector: 'الطاقة',
      marketCap: '445B'
    },

    // Healthcare
    {
      symbol: 'JNJ',
      name: 'Johnson & Johnson',
      price: 158.92,
      change: 1.45,
      changePercent: 0.92,
      signal: 'buy' as const,
      signalStrength: 71,
      timeFrame: '20-45 دقيقة',
      reasoning: 'استقرار القطاع الصحي، أخبار إيجابية عن الأدوية الجديدة، كسر مقاومة 158$',
      targetPrice: 162.00,
      stopLoss: 156.50,
      volume: '8.4M',
      lastUpdate: new Date(),
      type: 'stock',
      sector: 'الرعاية الصحية',
      marketCap: '421B',
      holdingPeriod: '5-10 أيام'
    },

    // Consumer
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 156.78,
      change: 0.45,
      changePercent: 0.29,
      signal: 'buy' as const,
      signalStrength: 72,
      timeFrame: '8-12 دقيقة',
      reasoning: 'نمو AWS قوي، تحسن هوامش الربح، صعود فوق المتوسط المتحرك، توقعات إيجابية للتجارة الإلكترونية',
      targetPrice: 159.50,
      stopLoss: 154.80,
      volume: '28.7M',
      lastUpdate: new Date(),
      type: 'stock',
      sector: 'التجارة الإلكترونية',
      marketCap: '1.6T'
    }
  ]);

  const [marketOverview, setMarketOverview] = useState({
    activeSignals: 6,
    accuracy: 89,
    totalProfit: '+15.2%',
    riskLevel: 'متوسط' as RiskLevel
  });

  // محاكاة تحديث البيانات كل 30 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setStocksData(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: (Math.random() - 0.5) * 4,
        changePercent: (Math.random() - 0.5) * 2,
        signalStrength: Math.max(30, Math.min(95, stock.signalStrength + (Math.random() - 0.5) * 10)),
        lastUpdate: new Date()
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = () => {
    switch (marketOverview.riskLevel) {
      case 'منخفض': return 'text-neon-green';
      case 'متوسط': return 'text-yellow-400';
      case 'مرتفع': return 'text-neon-pink';
      default: return 'text-gray-400';
    }
  };

  const filteredStocks = activeTab === 'all' 
    ? stocksData 
    : activeTab === 'favorites'
    ? stocksData // This will be handled by FavoritesManager
    : stocksData.filter(stock => stock.type === activeTab);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple via-neon-green to-neon-pink bg-clip-text text-transparent mb-2">
          TradawlAI Trading Pro
        </h1>
        <p className="text-gray-400 text-lg">
          منصة التداول الذكي المتقدمة • توصيات فورية • تحليلات احترافية
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="glass-effect p-4 border-neon-green/30 text-center glow-green">
          <div className="text-2xl font-bold text-neon-green">{marketOverview.activeSignals}</div>
          <div className="text-sm text-gray-400">إشارات نشطة</div>
        </Card>
        
        <Card className="glass-effect p-4 border-neon-purple/30 text-center glow-purple">
          <div className="text-2xl font-bold text-neon-purple">{marketOverview.accuracy}%</div>
          <div className="text-sm text-gray-400">دقة التوصيات</div>
        </Card>
        
        <Card className="glass-effect p-4 border-neon-green/30 text-center glow-green">
          <div className="text-2xl font-bold text-neon-green">{marketOverview.totalProfit}</div>
          <div className="text-sm text-gray-400">إجمالي الأرباح</div>
        </Card>
        
        <Card className="glass-effect p-4 border-white/10 text-center">
          <div className={`text-2xl font-bold ${getRiskColor()}`}>{marketOverview.riskLevel}</div>
          <div className="text-sm text-gray-400">مستوى المخاطرة</div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">
            الكل
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-neon-pink data-[state=active]:text-white">
            <Star className="w-4 h-4 ml-1" />
            المفضلة
          </TabsTrigger>
          <TabsTrigger value="stock" className="data-[state=active]:bg-neon-green data-[state=active]:text-white">
            الأسهم
          </TabsTrigger>
          <TabsTrigger value="etf" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">
            الصناديق
          </TabsTrigger>
          <TabsTrigger value="sovereign" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            السيادية
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <Zap className="w-6 h-6 text-neon-purple" />
            <h2 className="text-2xl font-bold text-white">جميع الأسهم والصناديق</h2>
            <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>تحديث كل 30 ثانية</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map((stock) => (
              <EnhancedStockCard
                key={stock.symbol}
                stock={stock}
                onViewChart={setSelectedChart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <FavoritesManager 
            allStocks={stocksData} 
            onViewChart={setSelectedChart}
          />
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <TrendingUp className="w-6 h-6 text-neon-green" />
            <h2 className="text-2xl font-bold text-white">الأسهم الأمريكية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map((stock) => (
              <EnhancedStockCard
                key={stock.symbol}
                stock={stock}
                onViewChart={setSelectedChart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="etf" className="space-y-4">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <BarChart3 className="w-6 h-6 text-neon-purple" />
            <h2 className="text-2xl font-bold text-white">الصناديق الاستثمارية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map((stock) => (
              <EnhancedStockCard
                key={stock.symbol}
                stock={stock}
                onViewChart={setSelectedChart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sovereign" className="space-y-4">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <Activity className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-white">الصناديق السيادية</h2>
          </div>

          <Card className="glass-effect p-6 border-yellow-500/30 glow-yellow text-center">
            <h3 className="text-xl font-semibold text-white mb-2">قريباً</h3>
            <p className="text-gray-400">توصيات الصناديق السيادية ستكون متاحة قريباً</p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Market Alerts */}
      <Card className="glass-effect p-6 border-yellow-500/30 glow-yellow">
        <div className="flex items-center space-x-2 space-x-reverse mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xl font-semibold text-white">تنبيهات السوق اللحظية</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-3">
            <span className="text-neon-green font-bold">🚀 فرصة قوية:</span>
            <span className="text-gray-300 mr-2">NVDA كسر مقاومة تاريخية - توقع صعود قوي خلال الساعات القادمة</span>
          </div>
          <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-3">
            <span className="text-neon-purple font-bold">📊 تحليل فني:</span>
            <span className="text-gray-300 mr-2">QQQ يشهد طلب مؤسسي قوي - مؤشر إيجابي للتكنولوجيا</span>
          </div>
          <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-3">
            <span className="text-neon-pink font-bold">⚠️ تحذير:</span>
            <span className="text-gray-300 mr-2">JPM تحت ضغط بعد نتائج الأرباح - احذر من هبوط محتمل</span>
          </div>
        </div>
      </Card>

      {/* Chart Modal */}
      {selectedChart && (
        <StockChart 
          symbol={selectedChart} 
          onClose={() => setSelectedChart(null)} 
        />
      )}
    </div>
  );
};

export default HomePage;
