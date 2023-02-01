/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '../models/role.enum';

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
    role?: string;
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
    role: Role,
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

  async update(
    id: string,
    data: Prisma.userUpdateInput,
  ) {
    if (data.password) {
      data.password = await bcrypt.hash(
        data.password,
        SALT_PASSWORD,
      );
    }
    const passwordData =
      await this.prismaClient.user.update({
        where: {
          id: id,
        },
        data: data,
      });
    delete passwordData.password;
    return passwordData;
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
