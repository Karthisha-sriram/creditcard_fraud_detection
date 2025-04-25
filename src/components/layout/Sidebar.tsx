
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart2, 
  CreditCard, 
  Home, 
  Settings, 
  Shield, 
  User, 
  Users 
} from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: <Home className="h-5 w-5" /> },
  { title: 'Transactions', href: '/transactions', icon: <CreditCard className="h-5 w-5" /> },
  { title: 'Statistics', href: '/statistics', icon: <BarChart2 className="h-5 w-5" /> },
  { title: 'Fraud Detection', href: '/fraud', icon: <Shield className="h-5 w-5" /> },
  { title: 'Customers', href: '/customers', icon: <Users className="h-5 w-5" /> },
  { title: 'Account', href: '/account', icon: <User className="h-5 w-5" /> },
  { title: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
];

const Sidebar = () => {
  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold flex items-center justify-center mb-6">
          <Shield className="h-5 w-5 text-fraud-dark mr-2" />
          FraudShield
        </h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            AD
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">admin@fraudshield.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
