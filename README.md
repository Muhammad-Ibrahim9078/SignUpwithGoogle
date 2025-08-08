# Firebase Authentication Project

A simple Firebase Authentication project with signup, login, and dashboard functionality.

## Features

- User registration with email/password
- User login with email/password
- Google authentication
- Protected dashboard
- Logout functionality

## Project Structure

```
├── index.html          # Landing page
├── signup.html         # User registration page
├── app.js             # Firebase configuration and authentication logic
├── folder/
│   ├── login.html     # User login page
│   └── dashboard.html # Protected dashboard page
├── netlify.toml       # Netlify configuration
├── vercel.json        # Vercel configuration
└── README.md          # This file
```

## Hosting Instructions

### Netlify Deployment

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Deploy settings:
   - Build command: Leave empty
   - Publish directory: `.` (root directory)
6. Click "Deploy site"

### Vercel Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy settings will be automatically detected from `vercel.json`
6. Click "Deploy"

## Firebase Configuration

Make sure your Firebase project has:
- Authentication enabled
- Email/Password sign-in method enabled
- Google sign-in method enabled
- Proper domain configuration for hosting

## Local Development

To run locally:
1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server like Live Server in VS Code

## Notes

- The project uses ES6 modules, so it needs to be served from a web server (not just opening HTML files)
- Firebase configuration is already set up in the code
- All authentication states are properly handled 