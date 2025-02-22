import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Calendar, MapPin, Book, Users } from 'lucide-react';

type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';
type Education = 'high-school' | 'bachelors' | 'masters' | 'phd' | 'other';

export default function CandidateProfileSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '' as Gender,
    location: '',
    education: '' as Education,
    about: ''
  });
  const [error, setError] = useState<string | null>(null);

  const educationOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'bachelors', label: 'Bachelor\'s Degree' },
    { value: 'masters', label: 'Master\'s Degree' },
    { value: 'phd', label: 'Ph.D.' },
    { value: 'other', label: 'Other' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.age || !formData.gender || !formData.location || !formData.education || !formData.about) {
        throw new Error('Please fill in all fields');
      }

      if (isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 100) {
        throw new Error('Please enter a valid age between 18 and 100');
      }

      // Mock API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store profile data
      localStorage.setItem('candidate_profile', JSON.stringify(formData));

      // Navigate to GitHub connect page
      navigate('/connect-github');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <GraduationCap size={48} className="text-blue-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-gray-400">Help employers understand your background better</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-[#0A0C10] rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                  Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="18"
                    max="100"
                    className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Enter your age"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                  Gender
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 text-white appearance-none"
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Education and About */}
          <div className="bg-[#0A0C10] rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Education & Background</h2>

            <div className="space-y-2">
              <label htmlFor="education" className="block text-sm font-medium text-gray-300">
                Highest Education Level
              </label>
              <div className="relative">
                <Book className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 text-white appearance-none"
                >
                  <option value="">Select education level</option>
                  {educationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="about" className="block text-sm font-medium text-gray-300">
                About You
              </label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-blue-500 text-white resize-none"
                placeholder="Tell us about yourself, your experience, and what you're looking for..."
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}