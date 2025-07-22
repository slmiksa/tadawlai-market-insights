
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, DollarSign, Target, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('جاري تحميل البيانات...');

  const loadingTexts = [
    'جاري تحميل البيانات...',
    'تحليل السوق الأمريكي...',
    'فحص الصناديق السيادية...',
    'إعداد التوصيات اللحظية...',
    'تجهيز الشارتات...'
  ];

  useEffect(() => {
    const duration = 4000;
    const interval = 50;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const textTimer = setInterval(() => {
      setCurrentText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  const tradingIcons = [
    { Icon: TrendingUp, delay: '0s', color: 'text-neon-green' },
    { Icon: BarChart3, delay: '0.5s', color: 'text-neon-purple' },
    { Icon: Activity, delay: '1s', color: 'text-neon-pink' },
    { Icon: DollarSign, delay: '1.5s', color: 'text-yellow-400' },
    { Icon: Target, delay: '2s', color: 'text-neon-green' },
    { Icon: Zap, delay: '2.5s', color: 'text-neon-purple' },
    { Icon: TrendingDown, delay: '3s', color: 'text-neon-pink' }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-gray-900 to-black flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-neon-purple rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full p-8">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Main Logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-neon-purple via-neon-green to-neon-pink bg-clip-text text-transparent mb-4 animate-fade-in">
            TradawlAI
          </h1>
          <div className="text-xl md:text-2xl text-gray-300 font-light mb-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            منصة التداول الذكي المتقدمة
          </div>
          <div className="text-sm text-gray-400 animate-fade-in" style={{ animationDelay: '1s' }}>
            توصيات فورية • تحليلات احترافية • شارتات متقدمة
          </div>
        </div>

        {/* Animated Trading Icons */}
        <div className="flex justify-center items-center space-x-8 space-x-reverse mb-12">
          {tradingIcons.map(({ Icon, delay, color }, index) => (
            <div
              key={index}
              className={`${color} animate-bounce`}
              style={{ animationDelay: delay, animationDuration: '2s' }}
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">{currentText}</span>
            <span className="text-sm text-neon-purple font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-purple via-neon-green to-neon-pink transition-all duration-300 ease-out rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '2s' }}>
          <div className="text-center">
            <div className="text-neon-green mb-1">🏦</div>
            <div>الأسهم الأمريكية</div>
          </div>
          <div className="text-center">
            <div className="text-neon-purple mb-1">📊</div>
            <div>الصناديق السيادية</div>
          </div>
          <div className="text-center">
            <div className="text-neon-pink mb-1">⚡</div>
            <div>توصيات لحظية</div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
