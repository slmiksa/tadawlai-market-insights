
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  Target,
  Zap
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'buy' | 'sell' | 'warning' | 'info';
  title: string;
  message: string;
  symbol: string;
  price: number;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'buy',
      title: 'إشارة شراء قوية',
      message: 'كسر مستوى المقاومة عند 185.50$ بحجم تداول مرتفع',
      symbol: 'AAPL',
      price: 185.75,
      time: '10:32 AM',
      priority: 'high'
    },
    {
      id: '2',
      type: 'sell',
      title: 'تحذير بيع',
      message: 'اقتراب من مستوى الدعم الحرج 200$',
      symbol: 'TSLA',
      price: 201.25,
      time: '10:28 AM',
      priority: 'high'
    },
    {
      id: '3',
      type: 'warning',
      title: 'تنبيه مخاطرة',
      message: 'تذبذب عالي متوقع بعد إعلان الأرباح',
      symbol: 'NVDA',
      price: 875.30,
      time: '10:15 AM',
      priority: 'medium'
    }
  ]);

  // إضافة تنبيهات جديدة كل فترة
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: ['buy', 'sell', 'warning', 'info'][Math.floor(Math.random() * 4)] as Alert['type'],
        title: 'تنبيه جديد',
        message: 'حركة سعرية مهمة في السوق',
        symbol: ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL'][Math.floor(Math.random() * 5)],
        price: Math.random() * 1000 + 100,
        time: new Date().toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'buy': return <TrendingUp className="w-5 h-5 text-neon-green" />;
      case 'sell': return <TrendingDown className="w-5 h-5 text-neon-pink" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default: return <Bell className="w-5 h-5 text-neon-purple" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'buy': return 'border-neon-green/30 bg-neon-green/5';
      case 'sell': return 'border-neon-pink/30 bg-neon-pink/5';
      case 'warning': return 'border-yellow-400/30 bg-yellow-400/5';
      default: return 'border-neon-purple/30 bg-neon-purple/5';
    }
  };

  const getPriorityBadge = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">عاجل</Badge>;
      case 'medium': return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">مهم</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">عادي</Badge>;
    }
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neon-purple mb-2">
            التنبيهات اللحظية
          </h1>
          <p className="text-gray-400">
            إشعارات فورية للفرص والمخاطر
          </p>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="flex items-center space-x-1 space-x-reverse text-neon-green">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-sm">مباشر</span>
          </div>
          <Button 
            variant="outline" 
            onClick={clearAlerts}
            className="border-white/20 text-gray-400 hover:text-white"
          >
            مسح الكل
          </Button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-effect p-4 border-neon-green/30 text-center">
          <div className="text-2xl font-bold text-neon-green mb-1">
            {alerts.filter(a => a.type === 'buy').length}
          </div>
          <div className="text-sm text-gray-400">إشارات شراء</div>
        </Card>
        
        <Card className="glass-effect p-4 border-neon-pink/30 text-center">
          <div className="text-2xl font-bold text-neon-pink mb-1">
            {alerts.filter(a => a.type === 'sell').length}
          </div>
          <div className="text-sm text-gray-400">إشارات بيع</div>
        </Card>
        
        <Card className="glass-effect p-4 border-yellow-400/30 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {alerts.filter(a => a.type === 'warning').length}
          </div>
          <div className="text-sm text-gray-400">تحذيرات</div>
        </Card>
        
        <Card className="glass-effect p-4 border-red-500/30 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {alerts.filter(a => a.priority === 'high').length}
          </div>
          <div className="text-sm text-gray-400">عاجل</div>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <Card className="glass-effect p-8 text-center border-white/10">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">لا توجد تنبيهات جديدة</p>
          </Card>
        ) : (
          alerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`glass-effect p-6 transition-all duration-300 hover:scale-[1.02] ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  {getAlertIcon(alert.type)}
                  <div>
                    <h3 className="font-semibold text-white text-lg">{alert.title}</h3>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-400 mt-1">
                      <span className="font-bold text-neon-purple">{alert.symbol}</span>
                      <span>${alert.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {getPriorityBadge(alert.priority)}
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{alert.message}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {alert.type === 'buy' && (
                    <Button size="sm" className="bg-neon-green text-black hover:bg-neon-green/80">
                      <Target className="w-4 h-4 ml-1" />
                      تحليل السهم
                    </Button>
                  )}
                  {alert.type === 'sell' && (
                    <Button size="sm" variant="outline" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black">
                      <AlertTriangle className="w-4 h-4 ml-1" />
                      عرض التفاصيل
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 space-x-reverse text-xs text-gray-500">
                  <Zap className="w-3 h-3" />
                  <span>AI Generated</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
