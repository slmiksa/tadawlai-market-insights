
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Bell, 
  Brain, 
  CreditCard, 
  Menu 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: Home, label: 'الرئيسية', path: '/' },
  { icon: TrendingUp, label: 'التحليل اللحظي', path: '/analysis' },
  { icon: Bell, label: 'التنبيهات', path: '/alerts' },
  { icon: Brain, label: 'ذكاء السوق', path: '/intelligence' },
  { icon: CreditCard, label: 'الاشتراكات', path: '/subscriptions' },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const NavContent = () => (
    <div className="flex flex-col space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30 glow-purple' 
                : 'hover:bg-white/5 hover:text-neon-purple'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="w-64 min-h-screen glass-effect border-r border-white/10 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-neon-purple">
              TadawlAI Trading
            </h1>
            <p className="text-sm text-gray-400 mt-1">منصة التداول الذكي</p>
          </div>
          <NavContent />
        </div>
        <div className="flex-1">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 glass-effect border-b border-white/10">
          <h1 className="text-xl font-bold text-neon-purple">TadawlAI</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-dark-bg border-l border-white/10">
              <div className="mt-8">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-neon-purple">
                    TadawlAI Trading
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">منصة التداول الذكي</p>
                </div>
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
