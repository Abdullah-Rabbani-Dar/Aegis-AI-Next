import React from 'react';
import { DivideIcon as LucideIcon, ExternalLink, ArrowRight } from 'lucide-react';

interface DocCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText: string;
  iconColor: string;
}

export default function DocCard({ icon: Icon, title, description, linkText, iconColor }: DocCardProps) {
  const getIconClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colorMap[color] || 'bg-blue-100 text-blue-600';
  };

  const getLinkIcon = () => {
    if (linkText.includes('Get Started')) return ArrowRight;
    return ExternalLink;
  };

  const LinkIcon = getLinkIcon();

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-gray-200/30 hover-lift">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getIconClasses(iconColor)}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
        <span>{linkText}</span>
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}