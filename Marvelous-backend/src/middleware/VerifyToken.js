//verify access token
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id; // Attach id to the request object
    // console.log('Token verified, user ID:', decoded.id);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export { verifyToken };