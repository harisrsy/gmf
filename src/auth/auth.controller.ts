import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    try {
      return await this.authService.authenticate(
        body.email,
        body.password,
      );
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post('register')
  async register(
    @Body() body: Prisma.userCreateInput,
  ) {
    try {
      return await this.userService.create(body);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post('logout')
  async logout(@Request() req) {
    this.authService.revokeToken(
      req.headers.authorization.replace(
        'Bearer ',
        '',
      ),
    );
    return { message: 'Successfully logged out' };
  }
}
