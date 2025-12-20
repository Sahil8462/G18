import React, { useState, useEffect, useRef } from 'react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to Smart Hire support. How can I help you today?", sender: 'support', time: new Date().toLocaleTimeString() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString()
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate support response
      setTimeout(() => {
        const responses = [
          "Thank you for your message. Let me help you with that.",
          "I understand your concern. Our team will assist you shortly.",
          "That's a great question! Let me provide you with the information.",
          "I'll connect you with our technical team for this issue.",
          "Thanks for contacting Smart Hire. We're here to help!"
        ];
        
        const supportMessage = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'support',
          time: new Date().toLocaleTimeString()
        };
        
        setMessages(prev => [...prev, supportMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#667eea',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '24px', color: 'white' }}>
          {isOpen ? '✕' : '💬'}
        </span>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '450px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            backgroundColor: '#667eea',
            color: 'white',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#28a745',
              borderRadius: '50%'
            }}></div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Smart Hire Support</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>Online • Typically replies instantly</p>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            backgroundColor: '#f8f9fa'
          }}>
            {messages.map((message) => (
              <div key={message.id} style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 12px',
                  borderRadius: '18px',
                  backgroundColor: message.sender === 'user' ? '#667eea' : 'white',
                  color: message.sender === 'user' ? 'white' : '#333',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  <p style={{ margin: 0 }}>{message.text}</p>
                  <p style={{ 
                    margin: '5px 0 0 0', 
                    fontSize: '0.7rem', 
                    opacity: 0.7 
                  }}>{message.time}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
                <div style={{
                  padding: '10px 12px',
                  borderRadius: '18px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  fontSize: '0.9rem'
                }}>
                  <span>Support is typing</span>
                  <span style={{ animation: 'blink 1s infinite' }}>...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid #e9ecef',
            backgroundColor: 'white'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <button
                className="btn btn-primary"
                onClick={sendMessage}
                style={{
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}
              >
                Send
              </button>
            </div>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '0.7rem',
              color: '#666',
              textAlign: 'center'
            }}>
              We typically reply within a few minutes
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default LiveChat;