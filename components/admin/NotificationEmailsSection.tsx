'use client'

import { useState, useEffect } from 'react';
import { Mail, Plus, Trash2, Power, PowerOff, Loader, AlertCircle } from 'lucide-react';
import { getNotificationEmails, addNotificationEmail, deleteNotificationEmail, toggleNotificationEmail } from '@/app/actions/notification-emails';

interface NotificationEmail {
  _id: string;
  email: string;
  label: string;
  isActive: boolean;
  createdAt: string;
}

export default function NotificationEmailsSection() {
  const [emails, setEmails] = useState<NotificationEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    try {
      const emailsData = await getNotificationEmails();
      setEmails(emailsData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmail = async (formData: FormData) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await addNotificationEmail(formData);
      setSuccess('Email added successfully');
      setShowAddForm(false);
      await loadEmails();
      
      // Clear form
      const form = document.getElementById('add-email-form') as HTMLFormElement;
      form?.reset();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEmail = async (emailId: string) => {
    if (!confirm('Are you sure you want to delete this email? This action cannot be undone.')) {
      return;
    }

    setActionLoading(emailId);
    try {
      await deleteNotificationEmail(emailId);
      setSuccess('Email deleted successfully');
      await loadEmails();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleEmail = async (emailId: string) => {
    setActionLoading(emailId);
    try {
      await toggleNotificationEmail(emailId);
      await loadEmails();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-8">
          <Loader className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading emails...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-900">Booking Notification Emails</h2>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Email</span>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Manage internal email addresses that receive booking notifications
        </p>
      </div>

      <div className="p-6">
        {/* Success/Error Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {/* Add Email Form */}
        {showAddForm && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Add New Email</h3>
            <form id="add-email-form" action={handleAddEmail} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="admin@company.com"
                    onChange={(e) => {
                      const isValid = validateEmail(e.target.value);
                      e.target.setCustomValidity(isValid ? '' : 'Please enter a valid email address');
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">
                    Label *
                  </label>
                  <input
                    type="text"
                    id="label"
                    name="label"
                    required
                    maxLength={100}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Admin Team"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Email</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Emails List */}
        <div className="space-y-3">
          {emails.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notification emails configured</p>
              <p className="text-sm text-gray-400">Add an email address to start receiving booking notifications</p>
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email._id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                  email.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${email.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <div>
                    <p className="font-medium text-gray-900">{email.label}</p>
                    <p className="text-sm text-gray-600">{email.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleEmail(email._id)}
                    disabled={actionLoading === email._id}
                    className={`p-2 rounded-lg transition-colors ${
                      email.isActive
                        ? 'text-green-600 hover:bg-green-100'
                        : 'text-gray-400 hover:bg-gray-100'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={email.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {actionLoading === email._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : email.isActive ? (
                      <Power className="w-4 h-4" />
                    ) : (
                      <PowerOff className="w-4 h-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleDeleteEmail(email._id)}
                    disabled={actionLoading === email._id}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete email"
                  >
                    {actionLoading === email._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {emails.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Active emails:</strong> {emails.filter(e => e.isActive).length} of {emails.length} will receive booking notifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}