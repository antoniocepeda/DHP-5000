import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { theme } from '../../styles/theme';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    yearsExperience: '',
    currentPosition: '',
    institution: '',
    cv: null as File | null,
    coverLetter: null as File | null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    setSubmitted(true);
    setTimeout(() => {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'cv' | 'coverLetter') => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-brand-purple/10 via-brand-orange/10 to-brand-pink/10 flex items-center justify-center">
        <div className={theme.components.card.base + ' w-full max-w-lg p-8 text-center'}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in joining our network. We'll review your application and get back to you soon.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-purple/10 via-brand-orange/10 to-brand-pink/10 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <a
          href="/recruitment"
          className="inline-flex items-center text-brand-purple hover:text-brand-pink mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Recruitment
        </a>

        <div className={theme.components.card.base + ' p-8'}>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Expert Application Form</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Specialty
                </label>
                <Select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  required
                >
                  <option value="">Select Specialty</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Immunology">Immunology</option>
                  <option value="Immunohematology">Immunohematology</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Hemostasis">Hemostasis</option>
                  <option value="Microbiology">Microbiology</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number
                </label>
                <Input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  min="5"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Position
                </label>
                <Input
                  type="text"
                  value={formData.currentPosition}
                  onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Institution/Hospital
              </label>
              <Input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV/Resume
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'cv')}
                    className="hidden"
                    id="cv-upload"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <label
                    htmlFor="cv-upload"
                    className={`${theme.components.button.secondary} w-full py-3 flex items-center justify-center gap-2`}
                  >
                    <Upload className="w-4 h-4" />
                    {formData.cv ? formData.cv.name : 'Choose File'}
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Cover Letter
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'coverLetter')}
                    className="hidden"
                    id="cover-letter-upload"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <label
                    htmlFor="cover-letter-upload"
                    className={`${theme.components.button.secondary} w-full py-3 flex items-center justify-center gap-2`}
                  >
                    <Upload className="w-4 h-4" />
                    {formData.coverLetter ? formData.coverLetter.name : 'Choose File'}
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  window.history.pushState({}, '', '/recruitment');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className={theme.components.button.secondary + ' px-6 py-3'}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={theme.components.button.primary + ' px-6 py-3'}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}