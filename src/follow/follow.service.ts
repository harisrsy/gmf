import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  

  async create(data: Prisma.followCreateManyInput) {
    const {ncrId} = data
    const cek = await this.prisma.follow.findUnique({
      where: {id: ncrId}
    });

    if (!cek) {
      throw new BadRequestException(`NCR with id "${ncrId}" does not exist.`);
    }
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

  update(
    id: number,
    data: Prisma.followUpdateInput,
  ) {
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

  async assignFollow(
    followId: number,
    ncrId: number,
  ) {
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
