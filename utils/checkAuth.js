import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secretApart2022');

      req.userId = decoded._id;

      next();
    } catch (error) {
      return res.status(403).json({
        message: 'Немає доступу',
        err: error,
      });
    }
  } else {
    return res.status(403).json({
      message: 'Немає доступу',
      token,
    });
  }
};
