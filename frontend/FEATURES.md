# Smart Hire Portal - Features

## Authentication System
- **Job Seeker Login**: test@example.com / password123
- **Recruiter Login**: recruiter@example.com / password123
- Protected routes with automatic redirection
- Role-based dashboard views

## Public Routes
- `/` - Guest landing page with job search
- `/login` - User authentication
- `/signup` - User registration with role selection

## Protected Routes (Requires Login)
- `/dashboard` - Role-based dashboard (Job Seeker or Recruiter view)
- `/my-network` - Network connections (placeholder)
- `/jobs` - Job listings (placeholder)
- `/messages` - Messaging system (placeholder)

## Features Implemented
✅ Modern responsive design with Tailwind-like styling
✅ Role-based authentication (Job Seeker vs Recruiter)
✅ Protected routing with ProtectedRoute component
✅ Guest homepage with hero section and job search
✅ Job Seeker Dashboard with 3-column layout
✅ Recruiter Dashboard with hiring stats and quick actions
✅ Automatic redirection after login/signup
✅ Logout functionality

## Dashboard Views

### Job Seeker Dashboard
- Left: Profile summary with photo and details
- Center: Create post component and activity feed
- Right: Suggested jobs and notifications

### Recruiter Dashboard  
- Left: Company profile and recruiter info
- Center: Quick actions (Post Job, Share Update) and industry news
- Right: Hiring statistics and notifications

## Technology Stack
- React.js with functional components and hooks
- react-router-dom for routing
- Custom CSS with Tailwind-like utility classes
- Local storage for authentication state
- Responsive design for mobile and desktop