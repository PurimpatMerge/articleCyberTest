import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.cookies.accessToken;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Remove "Bearer " prefix
    }
  }
  
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!", status: 401 });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(401).json({ message: "Token is not valid!", status: 401 });
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized!", status: 403 });
    }
  });
};
