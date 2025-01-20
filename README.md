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
VITE_BACKEND_URL = https://invoice-app-8q1z.onrender.com
```
This is my publicly hosted backend url 

5. Start the development server:
```bash
npm run dev
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
MONGODB_URI
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
JWT_SECRET
ZAPIER_API_KEY
CLIENT_URL
ZAPIER_WEBHOOK_URL1
ZAPIER_WEBHOOK_URL2
```
Shared my env credentials in code document file .

4. Start the backend server:
```bash
npm run start
```

The backend will be running at `http://localhost:5000`

## Running the Application

To run the complete application, you'll need to start both the frontend and backend servers:

1. Start the frontend (in the frontend directory):
```bash
npm run dev
```

2. Start the backend (in the backend directory):
```bash
npm run start
```
But as our backend is hooked by some zap workflows so , need to host it publicly .
 You can use my publicly hosted backend :
```bash
URL : https://invoice-app-8q1z.onrender.com
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
