
import { useState, useEffect } from 'react';
import AnalysisCard from '@/components/AnalysisCard';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  Layers, 
  Zap,
  Eye
} from 'lucide-react';

const AnalysisPage = () => {
  const [liveData, setLiveData] = useState({
    volume: 85,
    momentum: 67,
    support: 72,
    resistance: 45,
    sentiment: 78
  });

  const [candleAnalysis, setCandleAnalysis] = useState({
    pattern: 'Doji',
    strength: 'قوي',
    direction: 'صاعد'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData({
        volume: Math.floor(Math.random() * 100),
        momentum: Math.floor(Math.random() * 100),
        support: Math.floor(Math.random() * 100),
        resistance: Math.floor(Math.random() * 100),
        sentiment: Math.floor(Math.random() * 100)
      });

      const patterns = ['Doji', 'Hammer', 'Engulfing', 'Shooting Star'];
      const strengths = ['قوي', 'متوسط', 'ضعيف'];
      const directions = ['صاعد', 'هابط', 'جانبي'];
      
      setCandleAnalysis({
        pattern: patterns[Math.floor(Math.random() * patterns.length)],
        strength: strengths[Math.floor(Math.random() * strengths.length)],
        direction: directions[Math.floor(Math.random() * directions.length)]
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getProgressColor = (value: number) => {
    if (value >= 70) return 'bg-neon-green';
    if (value >= 40) return 'bg-yellow-400';
    return 'bg-neon-pink';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neon-purple mb-2">
          التحليل اللحظي
        </h1>
        <p className="text-gray-400">
          تحليل فوري لحركة السوق والسيولة
        </p>
      </div>

      {/* Real-time Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalysisCard
          title="السيولة"
          value={`${liveData.volume}%`}
          icon={<Activity className="w-6 h-6" />}
          glowColor={liveData.volume >= 70 ? 'green' : liveData.volume >= 40 ? 'purple' : 'pink'}
        >
          <Progress 
            value={liveData.volume} 
            className="h-2"
          />
        </AnalysisCard>

        <AnalysisCard
          title="الزخم"
          value={`${liveData.momentum}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          glowColor={liveData.momentum >= 70 ? 'green' : liveData.momentum >= 40 ? 'purple' : 'pink'}
        >
          <Progress 
            value={liveData.momentum} 
            className="h-2"
          />
        </AnalysisCard>

        <AnalysisCard
          title="الدعم"
          value={`${liveData.support}%`}
          icon={<BarChart3 className="w-6 h-6" />}
          glowColor={liveData.support >= 70 ? 'green' : liveData.support >= 40 ? 'purple' : 'pink'}
        >
          <Progress 
            value={liveData.support} 
            className="h-2"
          />
        </AnalysisCard>

        <AnalysisCard
          title="المقاومة"
          value={`${liveData.resistance}%`}
          icon={<Layers className="w-6 h-6" />}
          glowColor={liveData.resistance >= 70 ? 'green' : liveData.resistance >= 40 ? 'purple' : 'pink'}
        >
          <Progress 
            value={liveData.resistance} 
            className="h-2"
          />
        </AnalysisCard>
      </div>

      {/* Market Analysis Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candle Analysis */}
        <Card className="glass-effect p-6 border-neon-green/30 glow-green">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <Zap className="w-5 h-5 text-neon-green" />
            <h3 className="text-xl font-semibold text-white">تحليل الشموع</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">النموذج الحالي:</span>
                <span className="text-neon-green font-bold">{candleAnalysis.pattern}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">القوة:</span>
                <span className="text-yellow-400 font-bold">{candleAnalysis.strength}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">الاتجاه:</span>
                <span className={`font-bold ${
                  candleAnalysis.direction === 'صاعد' ? 'text-neon-green' : 
                  candleAnalysis.direction === 'هابط' ? 'text-neon-pink' : 'text-gray-400'
                }`}>
                  {candleAnalysis.direction}
                </span>
              </div>
            </div>
            
            <div className="text-sm text-gray-300">
              <p className="mb-2">📊 النموذج يشير إلى احتمالية {candleAnalysis.direction === 'صاعد' ? 'صعود' : candleAnalysis.direction === 'هابط' ? 'هبوط' : 'حركة جانبية'}</p>
              <p>⚡ قوة الإشارة: {candleAnalysis.strength}</p>
            </div>
          </div>
        </Card>

        {/* Order Book Analysis */}
        <Card className="glass-effect p-6 border-neon-pink/30 glow-pink">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <Eye className="w-5 h-5 text-neon-pink" />
            <h3 className="text-xl font-semibold text-white">جدران السوق</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">جدار البيع:</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-20 h-2 bg-gray-700 rounded">
                    <div className="h-full bg-neon-pink rounded" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-neon-pink font-bold">قوي</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">جدار الشراء:</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-20 h-2 bg-gray-700 rounded">
                    <div className="h-full bg-neon-green rounded" style={{width: '60%'}}></div>
                  </div>
                  <span className="text-neon-green font-bold">متوسط</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-2">
                📈 الطلب: 1.2M شراء عند 185.50$
              </p>
              <p className="text-sm text-gray-300">
                📉 العرض: 2.1M بيع عند 186.20$
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Market Sentiment */}
      <Card className="glass-effect p-6 border-neon-purple/30 glow-purple">
        <div className="flex items-center space-x-2 space-x-reverse mb-6">
          <Activity className="w-5 h-5 text-neon-purple" />
          <h3 className="text-xl font-semibold text-white">معنويات السوق</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green mb-2">{liveData.sentiment}%</div>
            <div className="text-gray-400">إيجابية</div>
            <Progress value={liveData.sentiment} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-pink mb-2">{100 - liveData.sentiment}%</div>
            <div className="text-gray-400">سلبية</div>
            <Progress value={100 - liveData.sentiment} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-neon-purple mb-2">
              {liveData.sentiment >= 60 ? 'متفائل' : liveData.sentiment >= 40 ? 'محايد' : 'متشائم'}
            </div>
            <div className="text-gray-400">التوقع العام</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisPage;
