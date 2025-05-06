import { verifyJWT } from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const user = verifyJWT(authorization.split(" ")[1]);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Unauthorized" });
  }
};

