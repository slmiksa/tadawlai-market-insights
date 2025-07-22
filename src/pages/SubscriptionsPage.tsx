
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Crown, 
  Check, 
  Zap, 
  Target, 
  Bell, 
  Brain,
  CreditCard,
  Smartphone
} from 'lucide-react';

const SubscriptionsPage = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'pro'>('basic');

  const plans = [
    {
      id: 'basic',
      name: 'الخطة الأساسية',
      price: 99,
      period: 'شهرياً',
      description: 'مثالية للمبتدئين',
      features: [
        'توصيات يومية محدودة',
        'تحليلات أساسية',
        'تنبيهات SMS',
        'دعم فني أساسي'
      ],
      color: 'neon-purple',
      popular: false
    },
    {
      id: 'premium',
      name: 'الخطة المتقدمة', 
      price: 199,
      period: 'شهرياً',
      description: 'الأكثر شعبية',
      features: [
        'توصيات لحظية غير محدودة',
        'تحليلات متقدمة بالذكاء الاصطناعي',
        'تنبيهات فورية متعددة',
        'تحليل الشموع والسيولة',
        'دعم فني متقدم',
        'تقارير أسبوعية'
      ],
      color: 'neon-green',
      popular: true
    },
    {
      id: 'pro',
      name: 'الخطة الاحترافية',
      price: 399,
      period: 'شهرياً', 
      description: 'للمحترفين',
      features: [
        'كل مميزات الخطة المتقدمة',
        'تحليل متقدم لجدران السوق',
        'إشارات خاصة عالية الدقة',
        'تخصيص كامل للتنبيهات',
        'دعم فني مخصص 24/7',
        'تقارير مفصلة يومية',
        'وصول مبكر للميزات الجديدة'
      ],
      color: 'neon-pink',
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'mada', name: 'مدى', icon: '💳' },
    { id: 'stc', name: 'STC Pay', icon: '📱' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎' },
    { id: 'visa', name: 'Visa/Mastercard', icon: '💎' }
  ];

  const getCardStyles = (planId: string) => {
    switch (planId) {
      case 'basic':
        return 'border-neon-purple/30 hover:border-neon-purple/50';
      case 'premium':
        return 'border-neon-green/30 hover:border-neon-green/50 glow-green';
      case 'pro':
        return 'border-neon-pink/30 hover:border-neon-pink/50';
      default:
        return 'border-white/10';
    }
  };

  const getPriceColor = (planId: string) => {
    switch (planId) {
      case 'basic': return 'text-neon-purple';
      case 'premium': return 'text-neon-green';
      case 'pro': return 'text-neon-pink';
      default: return 'text-white';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neon-purple mb-4">
          خطط الاشتراك
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          اختر الخطة المناسبة لك واحصل على توصيات ذكية لحظية تساعدك في اتخاذ قرارات التداول المناسبة
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`glass-effect p-8 transition-all duration-300 hover:scale-105 relative ${getCardStyles(plan.id)}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-neon-green text-black font-bold px-4 py-1">
                  الأكثر شعبية
                </Badge>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="mb-4">
                {plan.id === 'basic' && <Crown className="w-12 h-12 text-neon-purple mx-auto" />}
                {plan.id === 'premium' && <Zap className="w-12 h-12 text-neon-green mx-auto" />}
                {plan.id === 'pro' && <Target className="w-12 h-12 text-neon-pink mx-auto" />}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className={`text-4xl font-bold ${getPriceColor(plan.id)}`}>
                  {plan.price} ريال
                </span>
                <span className="text-gray-400 text-lg">/{plan.period}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse">
                  <Check className="w-5 h-5 text-neon-green flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              className={`w-full py-3 font-bold text-lg transition-all duration-300 ${
                plan.id === 'basic' 
                  ? 'bg-neon-purple hover:bg-neon-purple/80 text-black'
                  : plan.id === 'premium'
                  ? 'bg-neon-green hover:bg-neon-green/80 text-black'
                  : 'bg-neon-pink hover:bg-neon-pink/80 text-black'
              }`}
              onClick={() => setSelectedPlan(plan.id as any)}
            >
              {selectedPlan === plan.id ? 'الخطة المختارة' : 'اختيار الخطة'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <Card className="glass-effect p-8 border-white/10">
        <div className="flex items-center space-x-2 space-x-reverse mb-6">
          <CreditCard className="w-6 h-6 text-neon-purple" />
          <h3 className="text-2xl font-bold text-white">طرق الدفع</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {paymentMethods.map((method) => (
            <Card 
              key={method.id}
              className="glass-effect p-6 text-center hover:border-neon-purple/50 transition-colors cursor-pointer border-white/10"
            >
              <div className="text-3xl mb-2">{method.icon}</div>
              <div className="text-white font-semibold">{method.name}</div>
            </Card>
          ))}
        </div>

        {/* Auto Renewal */}
        <div className="flex items-center justify-between p-6 bg-black/20 rounded-lg border border-white/10">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Bell className="w-5 h-5 text-neon-green" />
            <div>
              <h4 className="font-semibold text-white">التجديد التلقائي</h4>
              <p className="text-gray-400 text-sm">تجديد الاشتراك تلقائياً كل شهر</p>
            </div>
          </div>
          <Switch 
            checked={autoRenewal}
            onCheckedChange={setAutoRenewal}
          />
        </div>
      </Card>

      {/* Features Comparison */}
      <Card className="glass-effect p-8 border-neon-green/30">
        <div className="flex items-center space-x-2 space-x-reverse mb-6">
          <Brain className="w-6 h-6 text-neon-green" />
          <h3 className="text-2xl font-bold text-white">مقارنة المميزات</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-gray-400 py-4 px-4">الميزة</th>
                <th className="text-neon-purple py-4 px-4">الأساسية</th>
                <th className="text-neon-green py-4 px-4">المتقدمة</th>
                <th className="text-neon-pink py-4 px-4">الاحترافية</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/5">
                <td className="py-4 px-4">عدد التوصيات اليومية</td>
                <td className="py-4 px-4">محدود</td>
                <td className="py-4 px-4 text-neon-green">غير محدود</td>
                <td className="py-4 px-4 text-neon-green">غير محدود</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-4">تحليل الذكاء الاصطناعي</td>
                <td className="py-4 px-4">أساسي</td>
                <td className="py-4 px-4 text-neon-green">متقدم</td>
                <td className="py-4 px-4 text-neon-green">احترافي</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-4">الدعم الفني</td>
                <td className="py-4 px-4">أساسي</td>
                <td className="py-4 px-4">متقدم</td>
                <td className="py-4 px-4 text-neon-pink">مخصص 24/7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* CTA Section */}
      <div className="text-center">
        <Button 
          size="lg"
          className="bg-neon-green hover:bg-neon-green/80 text-black font-bold px-12 py-4 text-xl glow-green"
        >
          ابدأ الاشتراك الآن
        </Button>
        <p className="text-gray-400 mt-4">
          * يمكنك إلغاء الاشتراك في أي وقت
        </p>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
