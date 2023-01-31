import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilefollowDto } from './follow.dto';

@Injectable()
export class FollowService {
  follow(id: any, body: FilefollowDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.followCreateInput) {
    return await this.prisma.follow.create({
      data,
    });
  }

  findAll() {
    return this.prisma.follow.findMany({
      include: {
        ncr: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.follow.findUnique({
      where: {
        id: +id,
      },
    });
  }

  update(id: number, data: Prisma.followUpdateInput) {
    return this.prisma.follow.update({
      where: {
        id: +id,
      },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.follow.delete({
      where: {
        id: +id,
      },
    });
  }

  async assignFollow(followId: number, ncrId: number) {
    return await this.prisma.follow.update({
      where: {
        id: +followId,
      },
      data: {
        ncr: {
          connect: {
            id: +ncrId,
          },
        },
      },
    });
  }
}
