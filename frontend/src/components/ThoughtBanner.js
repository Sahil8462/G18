import React, { useState, useEffect } from 'react';

const ThoughtBanner = () => {
  const thoughts = [
    "Your next opportunity is just one click away",
    "Great careers are built one step at a time",
    "Success happens when preparation meets opportunity",
    "The best time to find a job is when you don't need one",
    "Your skills are your greatest investment",
    "Every expert was once a beginner",
    "Dream big, work hard, stay focused",
    "Opportunities don't happen, you create them"
  ];

  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [thoughts.length]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%)',
      color: 'white',
      padding: '12px 0',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '500',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <span style={{ opacity: 0.9 }}>💡 </span>
        {thoughts[currentThought]}
      </div>
    </div>
  );
};

export default ThoughtBanner;