const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  
  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = user; // Attach user object to the request
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized: No user information found');
    }

    console.log("User object:", req.user);

    if (req.user.role !== role) {
      return res.status(403).send('Access denied: Insufficient permissions');
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
