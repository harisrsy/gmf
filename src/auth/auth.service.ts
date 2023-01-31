import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly blacklistedTokens: Set<string> = new Set<string>();

  constructor(private userService: UserService) {}

  async authenticate(email: string, password: string) {
    try {
      const user = await this.userService.validateUser(email, password);
      const token = jwt.sign(
        { uid: user.id, role: user.role },
        process.env.SECRET_JWT,
        { expiresIn: '7d' },
      );
      return { token };
    } catch (err) {
      throw err;
    }
  }

  revokeToken(token: string) {
    this.blacklistedTokens.add(token);
  }

  async isTokenRevoked(req: any) {
    const authorization = req.headers.authorization;
    if (!authorization) return true;

    const token = authorization.replace('Bearer ', '');
    return this.blacklistedTokens.has(token);
  }
}
