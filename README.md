# Invoice Reminder and Follow-up Automation

A comprehensive invoice management system built with the MERN stack (MongoDB, Express, React, Node.js) that automates reminder sending and follow-ups for unpaid invoices. The application seamlessly integrates with Zapier for enhanced automation capabilities.

## Features

- Automated invoice reminder system
- Email follow-up automation for unpaid invoices
- Zapier integration for extended automation
- User authentication 
- Invoice tracking and management

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Integration**: Zapier
- **Authentication**: JWT

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

## Project Setup

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/veeraj-singh/Invoice-app
```

2. Navigate to the frontend directory:
```bash
cd invoice-app/client
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the frontend root directory:
```bash
VITE_API_URL=http://localhost:5000
```

5. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd invoice-app/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory:
```bash
PORT=5000
MONGODB_URI=mongodb+srv://Veeraj:grr8UiVKeuX8H6TW@cluster0.dmply22.mongodb.net/Invoice-app
GOOGLE_CLIENT_ID=991165870122-u4jh2ur0tgqfegq3gjqvrhbt3u2nsd40.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
JWT_SECRET=jwt_secret_key
ZAPIER_API_KEY=341dd7f9fa57ee22a1bb6e4c13315f92a8467c24d67d84e35a41f9ade0d0721f
CLIENT_URL=http://localhost:5173
BASE_URL=https://invoice-app-8q1z.onrender.com
ZAPIER_WEBHOOK_URL1=https://hooks.zapier.com/hooks/catch/21356726/2k9s58p/
ZAPIER_WEBHOOK_URL2=https://hooks.zapier.com/hooks/catch/21356726/2k9hwkk/

```

4. Start the backend server:
```bash
npm start
```

The backend will be running at `http://localhost:5000`

## Running the Application

To run the complete application, you'll need to start both the frontend and backend servers:

1. Start the frontend (in the frontend directory):
```bash
npm start
```

2. Start the backend (in the backend directory):
```bash
npm start
```

## Development

### Frontend Development
The React application is configured with:
- React Router for navigation
- Axios for API calls
- Tailwind for components styles

### Backend Development
The Node.js/Express backend includes:
- RESTful API endpoints
- JWT authentication
- MongoDB integration
- Zapier integration
