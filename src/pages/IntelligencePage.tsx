
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Zap, 
  Eye,
  Award,
  RefreshCw
} from 'lucide-react';

const IntelligencePage = () => {
  const [performance, setPerformance] = useState({
    accuracy: 87,
    totalSignals: 156,
    successful: 135,
    failed: 21,
    winRate: 87
  });

  const [learningData, setLearningData] = useState({
    patternsLearned: 45,
    marketConditions: 12,
    improvements: 8
  });

  // محاكاة تحديث البيانات
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance(prev => ({
        ...prev,
        accuracy: Math.floor(Math.random() * 20) + 80,
        totalSignals: prev.totalSignals + Math.floor(Math.random() * 3),
        successful: prev.successful + Math.floor(Math.random() * 2),
        winRate: Math.floor(Math.random() * 20) + 80
      }));

      setLearningData(prev => ({
        ...prev,
        patternsLearned: prev.patternsLearned + Math.floor(Math.random() * 2),
        improvements: prev.improvements + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const recentLearnings = [
    {
      id: 1,
      pattern: 'Double Bottom',
      accuracy: 94,
      market: 'Tech Stocks',
      improvement: '+12%'
    },
    {
      id: 2,
      pattern: 'Bull Flag',
      accuracy: 89,
      market: 'Energy Sector',
      improvement: '+8%'
    },
    {
      id: 3,
      pattern: 'Head & Shoulders',
      accuracy: 91,
      market: 'Financial',
      improvement: '+15%'
    }
  ];

  const marketInsights = [
    {
      id: 1,
      title: 'تحسن في تحليل السيولة',
      description: 'الذكاء الاصطناعي تعلم قراءة أنماط السيولة بدقة أعلى بنسبة 15%',
      impact: 'high',
      time: 'منذ ساعتين'
    },
    {
      id: 2,
      title: 'اكتشاف نموذج جديد',
      description: 'تم تحديد نموذج تداول جديد في أسهم التكنولوجيا',
      impact: 'medium',
      time: 'منذ 4 ساعات'
    },
    {
      id: 3,
      title: 'تحسين دقة التنبؤات',
      description: 'زيادة دقة التنبؤات في فترات التذبذب العالي',
      impact: 'high',
      time: 'منذ 6 ساعات'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-neon-green bg-neon-green/10 border-neon-green/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neon-purple mb-2">
          ذكاء السوق
        </h1>
        <p className="text-gray-400">
          تحليل أداء الذكاء الاصطناعي والتعلم المستمر
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect p-6 border-neon-green/30 glow-green text-center">
          <Award className="w-8 h-8 text-neon-green mx-auto mb-3" />
          <div className="text-3xl font-bold text-neon-green mb-2">
            {performance.accuracy}%
          </div>
          <div className="text-gray-400">دقة التوصيات</div>
          <Progress value={performance.accuracy} className="mt-3 h-2" />
        </Card>

        <Card className="glass-effect p-6 border-neon-purple/30 glow-purple text-center">
          <Target className="w-8 h-8 text-neon-purple mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-2">
            {performance.totalSignals}
          </div>
          <div className="text-gray-400">إجمالي الإشارات</div>
          <div className="text-neon-green text-sm mt-2">
            +{Math.floor(Math.random() * 10) + 5} اليوم
          </div>
        </Card>

        <Card className="glass-effect p-6 border-neon-green/30 text-center">
          <TrendingUp className="w-8 h-8 text-neon-green mx-auto mb-3" />
          <div className="text-3xl font-bold text-neon-green mb-2">
            {performance.successful}
          </div>
          <div className="text-gray-400">إشارات ناجحة</div>
          <div className="text-gray-500 text-sm mt-2">
            من أصل {performance.totalSignals}
          </div>
        </Card>

        <Card className="glass-effect p-6 border-yellow-400/30 text-center">
          <BarChart3 className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {performance.winRate}%
          </div>
          <div className="text-gray-400">معدل الفوز</div>
          <Progress value={performance.winRate} className="mt-3 h-2" />
        </Card>
      </div>

      {/* Learning Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect p-6 border-neon-purple/30 glow-purple">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <Brain className="w-6 h-6 text-neon-purple" />
            <h3 className="text-xl font-semibold text-white">التعلم المستمر</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">الأنماط المكتشفة:</span>
              <span className="text-neon-green font-bold text-xl">
                {learningData.patternsLearned}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">ظروف السوق:</span>
              <span className="text-yellow-400 font-bold text-xl">
                {learningData.marketConditions}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">التحسينات:</span>
              <span className="text-neon-pink font-bold text-xl">
                {learningData.improvements}
              </span>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 mt-4">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Zap className="w-4 h-4 text-neon-green" />
                <span className="text-neon-green font-semibold">آخر تحديث</span>
              </div>
              <p className="text-gray-300 text-sm">
                تم تحسين خوارزمية تحليل الشموع لزيادة دقة التنبؤات بنسبة 8%
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect p-6 border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Eye className="w-6 h-6 text-neon-green" />
              <h3 className="text-xl font-semibold text-white">الأنماط المتعلمة</h3>
            </div>
            <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
          </div>

          <div className="space-y-4">
            {recentLearnings.map((learning) => (
              <div 
                key={learning.id}
                className="bg-black/30 rounded-lg p-4 hover:bg-black/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{learning.pattern}</h4>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    {learning.improvement}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{learning.market}</span>
                  <span className="text-neon-purple font-bold">
                    {learning.accuracy}% دقة
                  </span>
                </div>
                <Progress value={learning.accuracy} className="mt-2 h-1" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Market Insights */}
      <Card className="glass-effect p-6 border-neon-green/30">
        <div className="flex items-center space-x-2 space-x-reverse mb-6">
          <Brain className="w-6 h-6 text-neon-green" />
          <h3 className="text-xl font-semibold text-white">رؤى السوق الذكية</h3>
        </div>

        <div className="space-y-4">
          {marketInsights.map((insight) => (
            <div 
              key={insight.id}
              className="border border-white/10 rounded-lg p-4 hover:border-neon-purple/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-white text-lg">{insight.title}</h4>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact === 'high' ? 'تأثير عالي' : 'تأثير متوسط'}
                  </Badge>
                  <span className="text-gray-500 text-sm">{insight.time}</span>
                </div>
              </div>
              <p className="text-gray-300">{insight.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default IntelligencePage;
