import { Request, Response, Next } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const envCheck = (req: Request, res: Response, next: Next) => {
  const requiredEnvVars = ['FLICKR_HOST', 'FLICKR_API_KEY', 'FLICKR_API_SECRET', 'FLICKR_USER_ID', 'ORIGIN'];
  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(`Missing environment variables: ${missingVars.join(', ')}`);
    return res.status(500).json({ error: `Missing environment variables: ${missingVars.join(', ')}` });
  }

  next();
};
