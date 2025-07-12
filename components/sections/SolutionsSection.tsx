import SolutionCard from '../ui/SolutionCard';

export default function SolutionsSection() {
  const solutions = [
    {
      title: "Customer Support",
      description: "Automate support calls and resolve issues instantly",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
    },
    {
      title: "Sales & Lead Generation",
      description: "Qualify leads and schedule appointments automatically",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
    },
    {
      title: "Appointment Booking",
      description: "Handle scheduling and calendar management seamlessly",
      image: "https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
    }
  ];

  return (
    <section id="solutions" className="py-20 backdrop-blur scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 slide-in-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solutions for Every Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From healthcare to e-commerce, our AI voice agents adapt to your specific 
            industry needs and business requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="stagger-animation">
              <SolutionCard
                title={solution.title}
                description={solution.description}
                image={solution.image}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}