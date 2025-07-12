import { Bot, Zap, Shield, Users, Globe, Headphones } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "Natural Conversations",
      description: "Advanced AI that understands context and responds naturally to customer inquiries."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times ensure smooth, real-time conversations."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with industry standards."
    },
    {
      icon: Users,
      title: "Multi-Language",
      description: "Support for 40+ languages with native accent recognition."
    },
    {
      icon: Globe,
      title: "24/7 Availability",
      description: "Never miss a customer call with round-the-clock AI assistance."
    },
    {
      icon: Headphones,
      title: "Voice Recognition",
      description: "Advanced speech-to-text with 99.9% accuracy rates."
    }
  ];

  return (
    <section id="features" className="py-20 backdrop-blur scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features Built for Scale
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI voice agents come packed with enterprise-grade features designed to enhance 
            customer experience and drive business growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="stagger-animation">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}