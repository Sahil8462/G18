# SmartHire - Professional Hiring Platform

A modern, AI-powered job portal built with React and Spring Boot, featuring glassmorphism design and advanced matching algorithms.

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- Maven 3.6+

### Installation & Setup

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd G18
   ```

2. **Start Backend**
   ```bash
   # Windows
   run-backend.bat
   
   # Manual
   cd backend
   mvn spring-boot:run
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8084
   - H2 Console: http://localhost:8084/h2-console

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, Tailwind CSS, React Router
- **Backend**: Spring Boot 3.2, Spring Security, JPA
- **Database**: H2 (development), PostgreSQL (production)
- **Email**: Gmail SMTP for OTP verification

### Project Structure
```
G18/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context providers
│   │   └── styles/     # Global CSS styles
├── backend/            # Spring Boot API
│   └── src/main/java/com/smarthire/
│       ├── controller/ # REST endpoints
│       ├── service/    # Business logic
│       ├── config/     # Security & configuration
│       └── entity/     # Database models
└── run-backend.bat     # Backend startup script
```

## 🎯 Features

### For Job Seekers
- **Smart Profile Management** - AI-enhanced resume builder
- **Intelligent Job Matching** - Algorithm-based recommendations
- **Application Tracking** - Real-time status updates
- **Interview Scheduling** - Integrated calendar system

### For Recruiters
- **Advanced ATS** - Applicant tracking system
- **Hiring Analytics** - Performance insights & metrics
- **Job Lifecycle Management** - End-to-end posting workflow
- **Candidate Screening** - Automated filtering tools

### Security & Authentication
- **OTP Verification** - Email-based account verification
- **JWT Authentication** - Secure session management
- **Role-Based Access** - Separate dashboards for users/recruiters
- **Data Encryption** - Enterprise-grade security

## 🎨 Design System

### Professional Theme
- **Background**: #121212 (Dark)
- **Primary**: #6366f1 (Indigo)
- **Surface**: rgba(255, 255, 255, 0.05)
- **Glassmorphism**: backdrop-blur-md effects

### UI Components
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 compliant
- **Modern Animations** - Smooth transitions
- **Professional Typography** - Inter font family

## 🔧 Configuration

### Environment Variables
```properties
# Email Configuration
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Database (Production)
DB_URL=jdbc:postgresql://localhost:5432/smarthire
DB_USERNAME=username
DB_PASSWORD=password
```

### Development Setup
- Backend runs on port 8084
- Frontend runs on port 3000
- H2 database for development
- Hot reload enabled for both frontend/backend

## 📱 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send verification code
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication

### Health Check
- `GET /health` - Application status

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
mvn clean package
java -jar target/smarthire-0.0.1-SNAPSHOT.jar
```

### Docker Support
```dockerfile
# Dockerfile included for containerized deployment
docker build -t smarthire .
docker run -p 8084:8084 smarthire
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@smarthire.com
- Documentation: [Wiki](../../wiki)
- Issues: [GitHub Issues](../../issues)

---

**SmartHire** - Transforming the future of hiring with intelligent technology.