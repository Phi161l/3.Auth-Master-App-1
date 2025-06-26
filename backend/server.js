const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const PORT = 3001;
const USERS_FILE = path.join(__dirname, "../data/users.json");
const frontendPath = path.join(__dirname, "../public")


app.use(express.json());

// Session middleware
const sessionMiddleware = session({
  secret: "secretkey123",     // Secret key to sign the session ID cookie
  resave: false,              // Don't save session if unmodified
  saveUninitialized: false,       // Prevents creating sessions for every visitor (e.g., people who haven’t logged in).
});
app.use(sessionMiddleware);   // Use the session middleware in Express app


// root route 
app.get("/", (req, res) => {      
  if (req.session.existingUser) {
    res.redirect("/index.html");
  } else {
    res.redirect("/login.html");
  }
});

// Middleware to protect index.html
app.use("/index.html", (req, res, next) => {

  if (req.session.existingUser) {
    next(); // let user in
  } else {
    res.redirect("/login.html");      // block access
  }

});


// Middleware to protect secret-1.html
app.use("/secret-1.html", (req, res, next) => {

  // console.log("Session contents:", req.session);

  if (req.session.existingUser) {
    next(); // let user in
  } else {
    res.redirect("/login.html");      // block access
  }

});

// Middleware to protect secret-2.html
app.use("/secret-2.html", (req, res, next) => {

  if (req.session.existingUser) {
    next(); // let user in
  } else {
    res.redirect("/login.html");      // block access
  }
});

// Middleware to protect admin.html for admin only
app.use("/admin.html", (req, res, next) => {

  if (req.session.existingUser && req.session.existingUser.role === "admin") {
    next(); // Allow access
  } else {
    res.redirect("/login.html"); // Block others
  }
});


// middleware to serve the frontend
app.use(express.static(frontendPath));







// signup route
app.post("/api/signup", async(req, res) => {
  const { username, password } = req.body;

  // never trust client-side input even if vaildated in the frontend  as a backend developer!
  if (!username || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  // read from databse
  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

  // Check if username already exists
  const existingUser = users.find((user) => user.username == username);

  if (existingUser) {
    return res.json({ success: false, message: "Username already taken" });
  }

  // Hash password and save user
  const hashedpassword = await bcrypt.hash(password, 10);
  const newUser = {username, passwordhash:hashedpassword, role: "user"};

  users.push(newUser);

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({success: true});

});




// login route
app.post("/api/login", async (req, res) => {

  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  const existingUser = users.find((user) => user.username == username);

  if (!existingUser) {
    return res.json({ success: false, message: "User not found. you are not registered!" });
  };

  const match = await bcrypt.compare(password, existingUser.passwordhash);
  if (!match) {
    return res.json({ success: false, message: "Incorrect password" });
  };

  // Set session
  req.session.existingUser = {username: existingUser.username, role: existingUser.role};

  res.json({ success: true });
});




// Route to get logged-in user info - showing thier username!
app.get("/me", (req, res) => {
  if (req.session.existingUser) {
    res.json({ loggedIn: true, existingUser: req.session.existingUser });
  } else {
    res.json({ loggedIn: false });
  }
});



// logout route
app.get("/logout", (req, res) => {

  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login.html");
  });

  // console.log("Session contents:", req.session);
  
});












app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});