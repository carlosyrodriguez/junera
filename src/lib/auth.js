
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET; // Ensure this is set in your environment variables

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Assuming it includes user information like user.id
  } catch (error) {
    throw new Error("Invalid token");
  }
}