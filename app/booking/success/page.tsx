'use client'

import { CheckCircle, ArrowLeft, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Success Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/50 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Submitted Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest in Aegis AI. We've received your booking request and will get back to you soon.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
              <p className="text-sm text-gray-600">
                Our team will review your request and schedule a meeting within 24 hours.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
              <p className="text-sm text-gray-600">
                You'll receive a confirmation email with meeting details shortly.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Return to Home
            </Link>
            
            <p className="text-sm text-gray-500">
              Questions? Contact us at{' '}
              <a href="mailto:support@aegisai.com" className="text-blue-600 hover:text-blue-700">
                support@aegisai.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}