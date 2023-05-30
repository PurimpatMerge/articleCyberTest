import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!",status:401 });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(401).json({ message: "Token is not valid!" ,status:401});
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized!" ,status:403});
    }
  });
};
