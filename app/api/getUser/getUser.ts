import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { name: string; role: string };
    return res.status(200).json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
