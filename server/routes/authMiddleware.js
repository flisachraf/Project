const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("********",token)
    console.log('Received Token:', token); // Debugging
    if (!token) return res.status(403).json({ message: 'Access denied' });

    try {
        const cleanedToken = token.replace('Bearer ', '');
        const verified = jwt.verify(cleanedToken, process.env.JWT);
        console.log('Verified Token:', verified); // Debugging
        req.user = verified;
        next();
    } catch (err) {
        console.error('Token Verification Error:', err); // Debugging
        res.status(401).json({ message: 'Invalid token' });
    }
};

  
// Role-Based Authorization Middleware
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
      console.log('Role Unauthorized:', req); // Debugging
      return res.status(403).json({ message: 'Access denied' });
  }
  next();
};


module.exports = { authMiddleware, authorizeRoles };
