import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export class AuthorizationService {
  async sign(user: any,role: any): Promise<string> {
    const data = {
      user_id: user.user_id,
      email: user.email,
      password: user.password,
      admin: role.admin,
      roles: role.roles,
      movies : role.movies,
      series : role.series,
      statistics : role.statistics,
      advertising : role.advertising,
      uploads : role.uploads
    };
    return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
  }
}