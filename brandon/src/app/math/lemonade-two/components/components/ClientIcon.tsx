import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import all icons
const DollarSign = dynamic(() => import('lucide-react').then((mod) => mod.DollarSign), { ssr: false });
const Dog = dynamic(() => import('lucide-react').then((mod) => mod.Dog), { ssr: false });
const PiggyBank = dynamic(() => import('lucide-react').then((mod) => mod.PiggyBank), { ssr: false });
const ArrowRight = dynamic(() => import('lucide-react').then((mod) => mod.ArrowRight), { ssr: false });
const Link = dynamic(() => import('lucide-react').then((mod) => mod.Link), { ssr: false });
const Lock = dynamic(() => import('lucide-react').then((mod) => mod.Lock), { ssr: false });
const Eye = dynamic(() => import('lucide-react').then((mod) => mod.Eye), { ssr: false });
const CheckCircle2 = dynamic(() => import('lucide-react').then((mod) => mod.CheckCircle2), { ssr: false });
const ArrowDown = dynamic(() => import('lucide-react').then((mod) => mod.ArrowDown), { ssr: false });
const Sparkles = dynamic(() => import('lucide-react').then((mod) => mod.Sparkles), { ssr: false });
const RefreshCcw = dynamic(() => import('lucide-react').then((mod) => mod.RefreshCcw), { ssr: false });

interface ClientIconProps {
  name: 'DollarSign' | 'Dog' | 'PiggyBank' | 'ArrowRight' | 'Link' | 'Lock' | 'Eye' | 'CheckCircle2' | 'ArrowDown' | 'Sparkles' | 'RefreshCcw';
  className?: string;
}

const iconComponents = {
  DollarSign,
  Dog,
  PiggyBank,
  ArrowRight,
  Link,
  Lock,
  Eye,
  CheckCircle2,
  ArrowDown,
  Sparkles,
  RefreshCcw
};

const ClientIcon: React.FC<ClientIconProps> = ({ name, className = '' }) => {
  const IconComponent = iconComponents[name];
  return <IconComponent className={className} />;
};

export default ClientIcon;