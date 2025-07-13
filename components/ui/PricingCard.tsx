import React from 'react';
import { Check } from 'lucide-react';
import Button from './Button';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  popular = false
}: PricingCardProps) {
  const getBookingType = () => {
    if (name === 'Enterprise') return 'sales';
    return 'call';
  };

  const getButtonText = () => {
    if (name === 'Enterprise') return 'Contact Sales';
    return 'Get Started';
  };
  return (
    <div
      className={`bg-white/70 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/30 ${
        popular ? 'ring-2 ring-blue-600 relative animate-pulse-glow' : ''
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600 ml-2">{period}</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        variant={popular ? 'primary' : 'secondary'}
        bookingType={getBookingType()}
        className="w-full"
      >
        {getButtonText()}
      </Button>
    </div>
  );
}