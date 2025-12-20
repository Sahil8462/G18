import React from 'react';

const ProfessionalAbout = () => {
  const features = [
    { icon: '🤖', title: 'AI-Powered Matching', desc: 'Advanced algorithms for perfect job-candidate matches' },
    { icon: '🔒', title: 'Enterprise Security', desc: 'Bank-level security with end-to-end encryption' },
    { icon: '📊', title: 'Advanced Analytics', desc: 'Comprehensive insights and performance tracking' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Streamlined processes for rapid hiring decisions' }
  ];

  const team = [
    { name: 'Alex Johnson', role: 'CEO & Founder', avatar: 'AJ' },
    { name: 'Sarah Chen', role: 'CTO', avatar: 'SC' },
    { name: 'Mike Rodriguez', role: 'Head of Product', avatar: 'MR' },
    { name: 'Emily Davis', role: 'VP Engineering', avatar: 'ED' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">SmartHire</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the hiring industry with cutting-edge technology, 
            connecting exceptional talent with outstanding opportunities through intelligent automation.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="glass p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To transform the hiring landscape by leveraging artificial intelligence and modern technology, 
              making recruitment more efficient, fair, and successful for both employers and job seekers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose SmartHire?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="glass p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="glass p-12">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-indigo-400 mb-2">50K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">15K+</div>
                <div className="text-gray-400">Jobs Posted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">8K+</div>
                <div className="text-gray-400">Successful Hires</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalAbout;