import { MessageCircle, Play } from 'lucide-react';
import Button from '../ui/Button';

export default function DemoSection() {
  return (
    <section id="demo" className="py-20 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See It in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of our AI voice agents with an interactive demo. 
            See how natural conversations can transform your customer experience.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Live Demo</h3>
                <p className="text-blue-100">Try our AI voice agent right now</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">AI Agent Online</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm mb-2">Sample conversation:</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white/20 rounded-lg p-2">
                      <strong>Customer:</strong> "I need help with my order"
                    </div>
                    <div className="bg-blue-500/50 rounded-lg p-2">
                      <strong>AI Agent:</strong> "I&apos;d be happy to help! Can you provide your order number?"
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <Button variant="primary" icon={Play} bookingType="demo" className="bg-white text-blue-600 hover:bg-gray-50">
                  Start Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}