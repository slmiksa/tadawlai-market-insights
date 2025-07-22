
import { useState, useEffect } from 'react';
import AnalysisCard from '@/components/AnalysisCard';
import AlertButton from '@/components/AlertButton';
import { TrendingUp, TrendingDown, Activity, DollarSign, AlertTriangle, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const HomePage = () => {
  const [currentAlert, setCurrentAlert] = useState<'buy' | 'sell' | 'wait'>('wait');
  const [marketData, setMarketData] = useState({
    sp500: { value: 4785.32, change: 1.24 },
    nasdaq: { value: 15832.11, change: -0.87 },
    dowJones: { value: 37405.12, change: 0.56 }
  });

  const [riskLevel, setRiskLevel] = useState<'منخفض' | 'متوسط' | 'مرتفع'>('متوسط');

  // محاكاة تحديث البيانات
  useEffect(() => {
    const interval = setInterval(() => {
      const alerts = ['buy', 'sell', 'wait'] as const;
      const risks = ['منخفض', 'متوسط', 'مرتفع'] as const;
      
      setCurrentAlert(alerts[Math.floor(Math.random() * alerts.length)]);
      setRiskLevel(risks[Math.floor(Math.random() * risks.length)]);
      
      setMarketData(prev => ({
        sp500: { 
          value: prev.sp500.value + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 3
        },
        nasdaq: { 
          value: prev.nasdaq.value + (Math.random() - 0.5) * 50,
          change: (Math.random() - 0.5) * 3
        },
        dowJones: { 
          value: prev.dowJones.value + (Math.random() - 0.5) * 30,
          change: (Math.random() - 0.5) * 3
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = () => {
    switch (riskLevel) {
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
          تحليلات ذكية لحظية للسوق الأمريكي
        </p>
      </div>

      {/* Alert Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <AlertButton 
          type="buy" 
          isActive={currentAlert === 'buy'}
          onClick={() => setCurrentAlert('buy')}
        >
          🚀 اشتر الآن
        </AlertButton>
        <AlertButton 
          type="sell" 
          isActive={currentAlert === 'sell'}
          onClick={() => setCurrentAlert('sell')}
        >
          📉 بع الآن
        </AlertButton>
        <AlertButton 
          type="wait" 
          isActive={currentAlert === 'wait'}
          onClick={() => setCurrentAlert('wait')}
        >
          ⏳ انتظر
        </AlertButton>
      </div>

      {/* Risk Indicator */}
      <Card className="glass-effect p-6 text-center border-white/10">
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <span className="text-gray-400">مؤشر المخاطرة:</span>
          <span className={`font-bold text-lg ${getRiskColor()}`}>
            {riskLevel}
          </span>
        </div>
      </Card>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalysisCard
          title="S&P 500"
          value={marketData.sp500.value.toFixed(2)}
          subtitle={`${marketData.sp500.change > 0 ? '+' : ''}${marketData.sp500.change.toFixed(2)}%`}
          trend={marketData.sp500.change > 0 ? 'up' : 'down'}
          icon={<TrendingUp className="w-6 h-6" />}
          glowColor={marketData.sp500.change > 0 ? 'green' : 'pink'}
        />
        
        <AnalysisCard
          title="NASDAQ"
          value={marketData.nasdaq.value.toFixed(2)}
          subtitle={`${marketData.nasdaq.change > 0 ? '+' : ''}${marketData.nasdaq.change.toFixed(2)}%`}
          trend={marketData.nasdaq.change > 0 ? 'up' : 'down'}
          icon={<Activity className="w-6 h-6" />}
          glowColor={marketData.nasdaq.change > 0 ? 'green' : 'pink'}
        />
        
        <AnalysisCard
          title="Dow Jones"
          value={marketData.dowJones.value.toFixed(2)}
          subtitle={`${marketData.dowJones.change > 0 ? '+' : ''}${marketData.dowJones.change.toFixed(2)}%`}
          trend={marketData.dowJones.change > 0 ? 'up' : 'down'}
          icon={<DollarSign className="w-6 h-6" />}
          glowColor={marketData.dowJones.change > 0 ? 'green' : 'pink'}
        />
      </div>

      {/* Live Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect p-6 border-neon-purple/30 glow-purple">
          <div className="flex items-center space-x-2 space-x-reverse mb-4">
            <Zap className="w-5 h-5 text-neon-purple" />
            <h3 className="text-lg font-semibold text-white">التحليل اللحظي</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">السيولة:</span>
              <span className="text-neon-green font-bold">مرتفعة</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">الشموع:</span>
              <span className="text-neon-pink font-bold">هبوطية</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">الجدران:</span>
              <span className="text-yellow-400 font-bold">متوازنة</span>
            </div>
          </div>
        </Card>

        <Card className="glass-effect p-6 border-white/10">
          <div className="flex items-center space-x-2 space-x-reverse mb-4">
            <TrendingUp className="w-5 h-5 text-neon-green" />
            <h3 className="text-lg font-semibold text-white">آخر التنبيهات</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-3">
              <span className="text-neon-green font-bold">شراء قوي:</span>
              <span className="text-gray-300 mr-2">AAPL كسر مقاومة 185$</span>
            </div>
            <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-3">
              <span className="text-neon-pink font-bold">تحذير:</span>
              <span className="text-gray-300 mr-2">TSLA اقتراب من دعم 200$</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
