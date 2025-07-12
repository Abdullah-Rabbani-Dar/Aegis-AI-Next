import React from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface SolutionCardProps {
  title: string;
  description: string;
  image: string;
  index?: number;
}

export default function SolutionCard({ title, description, image, index = 0 }: SolutionCardProps) {
  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/30 hover-lift">
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover mix-blend-overlay"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index === 0}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
          <span>Learn More</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
