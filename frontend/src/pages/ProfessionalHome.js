import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfessionalHome = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: '🎯',
      title: 'Smart Job Matching',
      description: 'AI-powered algorithm matches candidates with perfect opportunities based on skills, experience, and preferences.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Comprehensive hiring analytics and insights to optimize your recruitment process and track performance.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🚀',
      title: 'Streamlined Process',
      description: 'Automated workflows and intelligent screening tools to accelerate your hiring timeline significantly.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption to protect sensitive candidate and company data.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '15K+', label: 'Jobs Posted' },
    { value: '8K+', label: 'Successful Hires' },
    { value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="container mx-auto text-center">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/g18-logo.png" 
              alt="SmartHire Logo" 
              className="h-16 w-auto mr-4"
            />
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SmartHire
              </h1>
              <p className="text-lg text-gray-400 mt-2">
                Next-Generation Hiring Platform
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Hiring Process
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect exceptional talent with outstanding opportunities through our AI-powered platform. 
            Experience the future of recruitment with advanced matching algorithms and streamlined workflows.
          </p>

          {/* CTA Buttons */}
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link 
                to="/register" 
                className="btn shimmer-btn text-lg px-8 py-4 w-full sm:w-auto"
              >
                Start Your Journey
              </Link>
              <Link 
                to="/login" 
                className="btn btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="mb-16">
              <Link 
                to={user?.role === 'recruiter' ? '/recruiter/dashboard' : '/jobseeker/dashboard'}
                className="btn shimmer-btn text-lg px-8 py-4"
              >
                Go to Dashboard
              </Link>
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="glass p-6 text-center">
                <div className="text-3xl font-bold text-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose SmartHire?
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the powerful features that make SmartHire the preferred choice 
              for modern recruitment professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className={`text-4xl mb-4 p-4 rounded-full bg-gradient-to-r ${feature.color} w-16 h-16 flex items-center justify-center mx-auto`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Job Seekers */}
            <div className="glass p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6">🎯</div>
              <h4 className="text-2xl font-bold text-white mb-4">
                For Job Seekers
              </h4>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Discover your dream career with personalized job recommendations, 
                skill-based matching, and direct connections to top employers.
              </p>
              <ul className="text-left text-gray-300 mb-8 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  AI-powered job matching
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Resume builder & optimization
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Interview scheduling
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Career insights & analytics
                </li>
              </ul>
              {!isAuthenticated && (
                <Link 
                  to="/register?role=jobseeker" 
                  className="btn shimmer-btn w-full"
                >
                  Find Your Dream Job
                </Link>
              )}
            </div>

            {/* Recruiters */}
            <div className="glass p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6">💼</div>
              <h4 className="text-2xl font-bold text-white mb-4">
                For Recruiters
              </h4>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Streamline your hiring process with advanced ATS, candidate screening, 
                and comprehensive analytics to find the perfect talent faster.
              </p>
              <ul className="text-left text-gray-300 mb-8 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Advanced ATS system
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Candidate screening tools
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Hiring analytics dashboard
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Team collaboration features
                </li>
              </ul>
              {!isAuthenticated && (
                <Link 
                  to="/register?role=recruiter" 
                  className="btn shimmer-btn w-full"
                >
                  Start Hiring Today
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <div className="glass p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Career or Hiring Process?
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have already discovered the power of SmartHire. 
                Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/register" 
                  className="btn shimmer-btn text-lg px-8 py-4"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/about" 
                  className="btn btn-secondary text-lg px-8 py-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalHome;