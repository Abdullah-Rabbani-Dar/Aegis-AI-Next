import { FileText, Star, Users } from 'lucide-react';
import DocCard from '../ui/DocCard';

export default function DocumentationSection() {
  const docCards = [
    {
      icon: FileText,
      title: "API Reference",
      description: "Complete API documentation with examples and use cases.",
      linkText: "View Docs",
      iconColor: "blue"
    },
    {
      icon: Star,
      title: "Quick Start Guide",
      description: "Get up and running with your first AI voice agent in minutes.",
      linkText: "Get Started",
      iconColor: "green"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join our developer community for support and discussions.",
      linkText: "Join Community",
      iconColor: "purple"
    }
  ];

  return (
    <section id="docs" className="py-20 backdrop-blur scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Developer Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive documentation, APIs, and guides to help you integrate 
            and customize our AI voice agents for your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docCards.map((card, index) => (
            <div key={index} className="stagger-animation">
              <DocCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                linkText={card.linkText}
                iconColor={card.iconColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}