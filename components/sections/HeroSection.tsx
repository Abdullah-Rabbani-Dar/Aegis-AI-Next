import { Play, Phone, ArrowDown } from 'lucide-react';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Voice Agents That
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient"> Transform</span>
              <br />Your Business
            </h1>
          </div>
          <div className="slide-in-left">
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Deploy intelligent voice agents that handle customer calls, support tickets, and sales inquiries 
              with human-like conversations and 24/7 availability.
            </p>
          </div>
          <div className="slide-in-right">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="primary" icon={Play} bookingType="demo" className="animate-pulse-glow">
                Try Live Demo
              </Button>
              <Button variant="outline" icon={Phone} bookingType="call">
                Book a Call
              </Button>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="scale-in">
            <div className="flex flex-col items-center mt-16 animate-bounce">
              <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
              <ArrowDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-green-400/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
    </section>
  );
}