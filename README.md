# Faculty FDP Management System

A comprehensive web application for managing faculty portfolios, tracking Faculty Development Programs (FDPs), seminars, and academic activities across different user roles (Admin, Faculty, HOD).

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js) or **yarn**

## Project Structure

```
Facultyfdp/
├── client/          # React frontend application
├── server/          # Express.js backend API
└── README.md        # This file
```

## Setup Instructions

### 1. Install MongoDB

1. Download and install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service, or run `mongod` from command prompt
   - **Mac/Linux**: Run `mongod` or `brew services start mongodb-community` (if installed via Homebrew)

### 2. Setup Server (Backend)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The server is configured to connect to MongoDB at `mongodb://127.0.0.1:27017/FDP`
   - Make sure MongoDB is running before starting the server
   - The database will be created automatically on first connection

4. Start the server:
   ```bash
   npm start
   ```

   The server will run on **http://localhost:3001**

   You should see:
   ```
   Connected to MongoDB
   Server is running on port 3001
   ```

### 3. Setup Client (Frontend)

1. Open a **new terminal window** (keep the server running)

2. Navigate to the client directory:
   ```bash
   cd client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The client will run on **http://localhost:5173** (or another port if 5173 is busy)

## Running the Application

### Development Mode

1. **Terminal 1** - Start MongoDB (if not running as a service):
   ```bash
   mongod
   ```

2. **Terminal 2** - Start the backend server:
   ```bash
   cd server
   npm start
   ```

3. **Terminal 3** - Start the frontend client:
   ```bash
   cd client
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## API Endpoints

The backend API is available at `http://localhost:3001/api`

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Faculty Routes (`/api/faculty`)
- FDP Attended: `GET`, `POST`, `PUT`, `DELETE /api/faculty/fdp/attended`
- FDP Organized: `GET`, `POST`, `PUT`, `DELETE /api/faculty/fdp/organized`
- Seminars: `GET`, `POST`, `PUT`, `DELETE /api/faculty/seminars`
- ABL: `GET`, `POST`, `PUT`, `DELETE /api/faculty/abl`
- Joint Teaching: `GET`, `POST`, `PUT`, `DELETE /api/faculty/joint-teaching`
- Adjunct Faculty: `GET`, `POST`, `PUT`, `DELETE /api/faculty/adjunct`
- Notifications: `GET /api/faculty/notifications`
- Dashboard: `GET /api/faculty/dashboard`

### Admin Routes (`/api/admin`)
- Faculty management
- FDP approval/rejection
- Events management
- Dashboard stats

### HOD Routes (`/api/hod`)
- Department faculty management
- Analytics and reports
- Dashboard stats

### Events (`/api/events`)
- `GET /api/events` - Get upcoming events
- `GET /api/events/all` - Get all events

## Default Test Users

You can create test users by registering through the API or directly in MongoDB. Example:

```javascript
// Register via API
POST http://localhost:3001/api/auth/register
{
  "name": "Admin User",
  "email": "admin@university.edu",
  "password": "admin123",
  "role": "admin"
}
```

## Troubleshooting

### MongoDB Connection Issues

- **Error: "MongoDB connection error"**
  - Make sure MongoDB is installed and running
  - Check if MongoDB is running on port 27017
  - Try restarting MongoDB service

### Port Already in Use

- **Error: "Port 3001 already in use"**
  - Change the port in `server/index.js` or set `PORT` environment variable
  - Kill the process using the port:
    - Windows: `netstat -ano | findstr :3001` then `taskkill /PID <PID> /F`
    - Mac/Linux: `lsof -ti:3001 | xargs kill`

### Dependencies Installation Issues

- **Error during `npm install`**
  - Delete `node_modules` folder and `package-lock.json`
  - Run `npm install` again
  - Make sure you're using Node.js v16 or higher

### CORS Issues

- If you encounter CORS errors, make sure:
  - The server is running on port 3001
  - The client is configured to call the correct API URL
  - CORS is enabled in `server/index.js` (already configured)

## Production Build

### Build Client for Production

```bash
cd client
npm run build
```

The built files will be in `client/dist/`

### Run Server in Production

```bash
cd server
# Remove nodemon and use node directly
node index.js
```

## Environment Variables

You can create a `.env` file in the server directory to customize:

```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/FDP
```

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Radix UI

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs

## License

ISC

## Author

Abi
