const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../app.config');

exports.verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];
  if (!token) {
    res.status(403).json({
      message: 'You are not allowed to access this resource',
    });
    return;
  }

  try {
    const tokenDecoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log('Token verification failed');
    res.status(403).json({
      message: 'You are not allowed to access this resource',
    });
    return;
  }
  return next();
};
