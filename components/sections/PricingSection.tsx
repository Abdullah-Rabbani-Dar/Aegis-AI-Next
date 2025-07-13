import PricingCard from '../ui/PricingCard';
import Button from '../ui/Button';

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$500",
      period: "/month",
      description: "Perfect for small businesses",
      features: [
        "Free 500 minutes/month",
        "Basic voice recognition",
        "Email support",
        "Custom voice agents",
        "Standard integrations"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$1000",
      period: "/month",
      description: "Ideal for growing companies",
      features: [
        "Free 1000 minutes/month",
        "Advanced AI capabilities",
        "Priority support",
        "Custom voice agents",
        "Custom integrations",
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations",
      features: [
        "Unlimited minutes",
        "Custom AI training",
        "24/7 dedicated support",
        "Unlimited agents",
        "Advanced analytics",
        "Custom LLM deployment"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20  backdrop-blur scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. All plans include our core features 
            with no hidden fees or long-term contracts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="stagger-animation">
              <PricingCard
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                popular={plan.popular}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}