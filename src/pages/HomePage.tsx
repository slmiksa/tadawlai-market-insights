
import { useState, useEffect } from 'react';
import AnalysisCard from '@/components/AnalysisCard';
import StockCard from '@/components/StockCard';
import { TrendingUp, TrendingDown, Activity, DollarSign, AlertTriangle, Zap, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

type RiskLevel = 'منخفض' | 'متوسط' | 'مرتفع';

const HomePage = () => {
  const [stocksData, setStocksData] = useState([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 185.64,
      change: 2.45,
      changePercent: 1.34,
      signal: 'buy' as const,
      signalStrength: 85,
      timeFrame: '5-15 دقيقة',
      reasoning: 'كسر مقاومة قوية عند 184$، سيولة عالية، تدفق أموال إيجابي',
      targetPrice: 188.50,
      stopLoss: 183.20,
      volume: '45.2M',
      lastUpdate: new Date()
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 198.34,
      change: -3.22,
      changePercent: -1.6,
      signal: 'sell' as const,
      signalStrength: 78,
      timeFrame: '3-8 دقائق',
      reasoning: 'هبوط تحت دعم رئيسي 200$، جدار بيع قوي، أخبار سلبية',
      targetPrice: 195.10,
      stopLoss: 201.50,
      volume: '38.9M',
      lastUpdate: new Date()
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
      reasoning: 'حركة جانبية، عدم وضوح الاتجاه، انتظار كسر 415$ أو 410$',
      targetPrice: 415.00,
      stopLoss: 410.00,
      volume: '22.1M',
      lastUpdate: new Date()
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
      reasoning: 'اختراق قوي فوق 740$، حجم تداول ضخم، أخبار إيجابية عن الذكاء الاصطناعي',
      targetPrice: 755.00,
      stopLoss: 742.00,
      volume: '67.8M',
      lastUpdate: new Date()
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 168.92,
      change: -1.88,
      changePercent: -1.1,
      signal: 'sell' as const,
      signalStrength: 68,
      timeFrame: '10-20 دقيقة',
      reasoning: 'كسر دعم 170$، ضعف في الشموع، تدفق أموال سلبي',
      targetPrice: 166.50,
      stopLoss: 171.20,
      volume: '31.5M',
      lastUpdate: new Date()
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 156.78,
      change: 0.45,
      changePercent: 0.29,
      signal: 'buy' as const,
      signalStrength: 72,
      timeFrame: '8-12 دقيقة',
      reasoning: 'صعود فوق المتوسط المتحرك، دعم قوي عند 155$، توقعات إيجابية',
      targetPrice: 159.50,
      stopLoss: 154.80,
      volume: '28.7M',
      lastUpdate: new Date()
    }
  ]);

  const [marketOverview, setMarketOverview] = useState({
    activeSignals: 4,
    accuracy: 87,
    totalProfit: '+12.8%',
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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-neon-purple mb-2">
          TradawlAI Trading
        </h1>
        <p className="text-gray-400 text-lg">
          توصيات فورية للأسهم الأمريكية بالذكاء الاصطناعي
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="glass-effect p-4 border-neon-green/30 text-center">
          <div className="text-2xl font-bold text-neon-green">{marketOverview.activeSignals}</div>
          <div className="text-sm text-gray-400">إشارات نشطة</div>
        </Card>
        
        <Card className="glass-effect p-4 border-neon-purple/30 text-center">
          <div className="text-2xl font-bold text-neon-purple">{marketOverview.accuracy}%</div>
          <div className="text-sm text-gray-400">دقة التوصيات</div>
        </Card>
        
        <Card className="glass-effect p-4 border-neon-green/30 text-center">
          <div className="text-2xl font-bold text-neon-green">{marketOverview.totalProfit}</div>
          <div className="text-sm text-gray-400">إجمالي الأرباح</div>
        </Card>
        
        <Card className="glass-effect p-4 border-white/10 text-center">
          <div className={`text-2xl font-bold ${getRiskColor()}`}>{marketOverview.riskLevel}</div>
          <div className="text-sm text-gray-400">مستوى المخاطرة</div>
        </Card>
      </div>

      {/* Live Stocks Analysis */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 space-x-reverse mb-6">
          <Zap className="w-6 h-6 text-neon-purple" />
          <h2 className="text-2xl font-bold text-white">التحليل اللحظي للأسهم</h2>
          <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>تحديث كل 30 ثانية</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocksData.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>

      {/* Market Alerts */}
      <Card className="glass-effect p-6 border-yellow-500/30 glow-yellow">
        <div className="flex items-center space-x-2 space-x-reverse mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xl font-semibold text-white">تنبيهات السوق</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-3">
            <span className="text-neon-green font-bold">🚀 فرصة قوية:</span>
            <span className="text-gray-300 mr-2">NVDA كسر مقاومة تاريخية - توقع صعود قوي</span>
          </div>
          <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-3">
            <span className="text-neon-pink font-bold">⚠️ تحذير:</span>
            <span className="text-gray-300 mr-2">TSLA تحت ضغط بيع شديد - احذر من الهبوط</span>
          </div>
          <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-3">
            <span className="text-neon-purple font-bold">📊 تحليل:</span>
            <span className="text-gray-300 mr-2">السوق يشهد تقلبات عالية - اتبع إدارة المخاطر</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
