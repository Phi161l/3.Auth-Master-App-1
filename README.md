# Session-Based Authentication App

## Overview
This is a simple Node.js and Express web application demonstrating **session-based authentication**.  
Users can **sign up**, **log in**, access **protected pages**, and **log out**. User sessions are stored on the server using `express-session`.

The project is built **for learning purposes** to understand how session-based authentication works in practice.

---

## Features
- User signup with hashed passwords (using bcrypt)  
- User login with session creation  
- Protected routes accessible only when logged in  
- Role-based access control for admin pages  
- Logout functionality that destroys the session  
- Redirects users based on authentication state  

---

## Technologies
- Node.js  
- Express.js  
- express-session (for session management)  
- bcrypt (for password hashing)  
- File-based user storage (JSON file)  

---

## How It Works
1. **Signup**: Users create accounts with username and password. Passwords are securely hashed before saving.  
2. **Login**: User credentials are validated. On success, a session is created and stored server-side.  
3. **Session**: The session is identified by a cookie sent to the browser. For each request, the server checks the session to confirm the user is authenticated.  
4. **Protected Routes**: Middleware checks if the session exists before allowing access to secret or admin pages. Otherwise, users are redirected to login.  
5. **Logout**: The session is destroyed, and the user is redirected to the login page.  

---

## Setup Instructions
1. Clone the repo  
2. Run `npm install` to install dependencies  
3. Create a `data` folder with a `users.json` file (start with empty array: `[]`)  
4. Run the server: `node server.js`  
5. Open browser at `http://localhost:3001`  

---

## Folder Structure
project-root/
├── data/
│ └── users.json # User data storage
├── public/
│ ├── index.html # Main page
│ ├── login.html # Login page
│ ├── signup.html # Signup page
│ ├── secret-1.html # Protected secret page
│ ├── secret-2.html # Protected secret page
│ └── admin.html # Admin-only page
├── server.js # Express server with session auth
├── package.json
└── README.md

yaml
Copy
Edit

---
