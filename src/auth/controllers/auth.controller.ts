import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Role } from '../models/role.enum';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Roles(Role.USER, Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  @Post('login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
      role: Role;
    },
  ) {
    try {
      return await this.authService.authenticate(
        body.email,
        body.password,
        body.role,
      );
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
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
  @Roles(Role.USER, Role.ADMIN)
  //@UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async changePass(
    @Param('id') id: string,
    @Body() body: { password?: string },
  ) {
    return await this.userService.update(id, {
      password: body.password,
    });
  }
}
