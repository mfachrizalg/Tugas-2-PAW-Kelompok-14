// utils/checkAuth.js
import jwt from "jsonwebtoken";

export const checkAuth = (req) => {
  const token = req.cookies.jwt;

  if (!token) {
    return { authorized: false };
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    return { authorized: true, user: decoded };
  } catch (error) {
    return { authorized: false };
  }
};
