import React, { useState, useEffect } from 'react';

const ProactiveAI = ({ userRole, userName }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    // Simulate AI suggestions based on user behavior
    const generateSuggestions = () => {
      if (userRole === 'jobSeeker') {
        return [
          `Hi ${userName}, continue your React Developer job search?`,
          'You have 3 new job matches in Pune',
          'Complete your profile to get 40% more job views',
          'Your saved job at TCS expires in 2 days'
        ];
      } else {
        return [
          `Hi ${userName}, review 12 new applications for Java Developer role?`,
          'Your React Developer job post needs attention',
          'Upgrade to Premium to reach 50% more candidates',
          'Schedule interviews for Frontend Developer position'
        ];
      }
    };

    setSuggestions(generateSuggestions());
  }, [userRole, userName]);

  if (!showSuggestions) return null;

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      padding: '15px',
      margin: '20px 0',
      position: 'relative'
    }}>
      <button 
        onClick={() => setShowSuggestions(false)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '18px'
        }}
      >
        ×
      </button>
      
      <h4 style={{color: '#007bff', marginBottom: '15px'}}>
        🤖 Smart Suggestions
      </h4>
      
      {suggestions.map((suggestion, index) => (
        <div key={index} style={{
          backgroundColor: 'white',
          padding: '10px',
          margin: '8px 0',
          borderRadius: '5px',
          border: '1px solid #dee2e6',
          cursor: 'pointer'
        }}>
          <p style={{margin: 0}}>{suggestion}</p>
          <button style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            marginTop: '5px',
            fontSize: '12px'
          }}>
            Take Action
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProactiveAI;