
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 2.5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-slate-900 to-dark-bg flex items-center justify-center z-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-purple/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-neon-green/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-neon-pink/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative text-center">
        {/* Main Logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-neon-purple via-neon-green to-neon-pink bg-clip-text animate-pulse">
            TadawlAI
          </h1>
          <p className="text-2xl md:text-3xl font-light text-neon-purple mt-2 animate-fade-in">
            Trading
          </p>
        </div>

        {/* Animated Trading Icons */}
        <div className="flex justify-center items-center space-x-8 space-x-reverse mb-8">
          <div className="animate-bounce delay-0">
            <TrendingUp className="w-8 h-8 text-neon-green" />
          </div>
          <div className="animate-bounce delay-200">
            <DollarSign className="w-10 h-10 text-neon-purple" />
          </div>
          <div className="animate-bounce delay-400">
            <Activity className="w-8 h-8 text-neon-pink" />
          </div>
          <div className="animate-bounce delay-600">
            <TrendingDown className="w-8 h-8 text-neon-pink" />
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-neon-purple via-neon-green to-neon-pink transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-400 text-sm animate-pulse">
          جاري تحميل منصة التداول الذكي...
        </p>

        {/* Floating Numbers Animation */}
        <div className="absolute -top-20 -left-20 text-neon-green/30 text-4xl font-bold animate-spin">
          $
        </div>
        <div className="absolute -bottom-20 -right-20 text-neon-pink/30 text-3xl font-bold animate-spin delay-1000">
          ₿
        </div>
        <div className="absolute top-0 right-0 text-neon-purple/30 text-2xl font-bold animate-bounce">
          📈
        </div>
        <div className="absolute bottom-0 left-0 text-neon-green/30 text-2xl font-bold animate-bounce delay-500">
          📊
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
