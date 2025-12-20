import React from 'react';

const ProfessionalBanner = ({ title, subtitle, userType }) => {
  return (
    <div style={{
      width: '100%',
      height: '300px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)',
      position: 'relative',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      overflow: 'hidden'
    }}>
      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '40px',
        width: '80px',
        height: '80px',
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '50%',
        border: '1px solid rgba(99, 102, 241, 0.2)'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        width: '60px',
        height: '60px',
        background: 'rgba(16, 185, 129, 0.08)',
        borderRadius: '8px',
        border: '1px solid rgba(16, 185, 129, 0.15)',
        transform: 'rotate(15deg)'
      }} />

      <div style={{
        position: 'absolute',
        top: '50px',
        left: '60px',
        width: '40px',
        height: '40px',
        background: 'rgba(245, 158, 11, 0.06)',
        borderRadius: '50%',
        border: '1px solid rgba(245, 158, 11, 0.12)'
      }} />

      {/* Content Area */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#1e293b',
        zIndex: 2
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 0.5rem 0',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          letterSpacing: '-0.02em'
        }}>
          {title || 'SmartHire Professional'}
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          fontWeight: '500',
          margin: '0',
          opacity: 0.8,
          letterSpacing: '0.01em'
        }}>
          {subtitle || `${userType === 'recruiter' ? 'Talent Acquisition Specialist' : 'Career Professional'}`}
        </p>
      </div>

      {/* Subtle Pattern Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.02) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default ProfessionalBanner;