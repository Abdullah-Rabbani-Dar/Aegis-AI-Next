'use client'

import { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBooking } from '@/app/actions/booking';
import { ArrowLeft, Building, Mail, Phone, User, Users } from 'lucide-react';
import Link from 'next/link';
import Snackbar from '@/components/ui/Snackbar';

// Define types
type BookingType = 'call' | 'demo' | 'sales';
type SnackbarType = 'loading' | 'success' | 'error';
type ValidationErrors = Record<string, string>;

interface SnackbarState {
  isVisible: boolean;
  type: SnackbarType;
  message: string;
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const bookingType = (searchParams.get('type') as BookingType) || 'call';
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  // Snackbar state management
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isVisible: false,
    type: 'loading',
    message: ''
  });

  // Validation patterns matching your Mongoose model
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const contactPattern = /^(\+\d{1,3})?[\s\-\(\)]?[\d\s\-\(\)]{6,20}$/;

  const showSnackbar = (type: SnackbarType, message: string): void => {
    setSnackbar({
      isVisible: true,
      type,
      message
    });
  };

  const hideSnackbar = (): void => {
    setSnackbar(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  const getTitle = (): string => {
    switch (bookingType) {
      case 'demo': return 'Book a Demo';
      case 'sales': return 'Contact Sales';
      default: return 'Book a Call';
    }
  };

  const getDescription = (): string => {
    switch (bookingType) {
      case 'demo': return 'See our AI voice agents in action with a personalized demo.';
      case 'sales': return 'Speak with our sales team about enterprise solutions.';
      default: return 'Schedule a call with our team to discuss your needs.';
    }
  };

  const validateField = (name: string, value: string): ValidationErrors => {
    const errors: ValidationErrors = {};

    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        } else if (value.length > 100) {
          errors.name = 'Name cannot exceed 100 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!emailPattern.test(value.toLowerCase())) {
          errors.email = 'Please enter a valid email address';
        }
        break;

      case 'contact':
        if (!value.trim()) {
          errors.contact = 'Contact number is required';
        } else if (!contactPattern.test(value)) {
          errors.contact = 'Please enter a valid contact number';
        }
        break;

      case 'companyName':
        if (!value.trim()) {
          errors.companyName = 'Company name is required';
        } else if (value.length > 200) {
          errors.companyName = 'Company name cannot exceed 200 characters';
        }
        break;

      case 'companySize':
        if (!value) {
          errors.companySize = 'Company size is required';
        } else if (!['1-10', '11-50', '51-200', '201-1000', '1000+'].includes(value)) {
          errors.companySize = 'Please select a valid company size';
        }
        break;
    }

    return errors;
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    const fieldErrors = validateField(name, value);
    
    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name] || ''
    }));

    // Clear general error when user starts typing
    if (error) {
      setError('');
    }
  };

  const validateForm = (formData: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    // Validate all fields
    const fields = ['name', 'email', 'contact', 'companyName', 'companySize'];
    fields.forEach(field => {
      const value = formData.get(field) as string;
      const fieldErrors = validateField(field, value);
      Object.assign(errors, fieldErrors);
    });

    return errors;
  };

  const handleSubmit = async (formData: FormData): Promise<void> => {
    console.log('Form submit started');
    
    // Reset states
    setError('');
    setValidationErrors({});
    hideSnackbar();
    
    // Validate form before submission
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.log('Validation errors found:', errors);
      setValidationErrors(errors);
      showSnackbar('error', 'Please fix the errors in the form');
      return;
    }

    // Add booking type to form data
    formData.append('bookingType', bookingType);
    
    // Show loading snackbar immediately
    showSnackbar('loading', 'Submitting your booking...');
    
    startTransition(async () => {
      try {
        console.log('Calling createBooking');
        await createBooking(formData);
        console.log('createBooking completed successfully');
        
        // Show success message - the redirect will happen after this
        showSnackbar('success', 'Booking submitted successfully! Redirecting...');
        
      } catch (error: unknown) {
        console.error('Booking error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to submit booking. Please try again.';
        setError(errorMessage);
        showSnackbar('error', errorMessage);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      {/* Snackbar */}
      <Snackbar
        isVisible={snackbar.isVisible}
        type={snackbar.type}
        message={snackbar.message}
        onClose={hideSnackbar}
        autoHide={snackbar.type !== 'loading'}
        duration={snackbar.type === 'success' ? 2000 : 4000}
      />
      
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{getTitle()}</h1>
            <p className="text-gray-600">{getDescription()}</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  onChange={handleFieldChange}
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    validationErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={handleFieldChange}
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  required
                  onChange={handleFieldChange}
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    validationErrors.contact ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {validationErrors.contact && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.contact}</p>
                )}
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  maxLength={200}
                  onChange={handleFieldChange}
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    validationErrors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your company name"
                />
                {validationErrors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.companyName}</p>
                )}
              </div>
            </div>

            {/* Company Size */}
            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                Company Size *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="companySize"
                  name="companySize"
                  required
                  onChange={handleFieldChange}
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                    validationErrors.companySize ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
                {validationErrors.companySize && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.companySize}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit {getTitle()}</span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            We'll get back to you within 24 hours to schedule your {bookingType}.
          </p>
        </div>
      </div>
    </div>
  );
}