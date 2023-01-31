/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

const SALT_PASSWORD = 12;

@Injectable()
export class UserService {
  constructor(
    private prismaClient: PrismaService,
  ) {}

  async create(user: Prisma.userCreateInput) {
    if (user.password) {
      user.password = await bcrypt.hash(
        user.password,
        SALT_PASSWORD,
      );
    }
    const userData =
      await this.prismaClient.user.create({
        data: user,
      });
    delete userData.password;
    return userData;
  }

  async findOne(user: {
    id?: string;
    email?: string;
  }) {
    const userData =
      await this.prismaClient.user.findUnique({
        where: user,
      });
    if (!userData) return null;
    return userData;
  }

  async validateUser(
    email: string,
    password: string,
  ) {
    const user = await this.findOne({ email });
    if (!user) throw new UserNotFoundException();

    const isMatch = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isMatch)
      throw new AuthenticationFailedExecption();
    delete user.password;
    return user;
  }
}

class UserNotFoundException extends Error {
  name = 'UserNotFoundExecption';
  message = 'User not found';
}

class AuthenticationFailedExecption extends Error {
  name = 'AuthenticationFailedExecption';
  message = 'Password is wrong';
}
