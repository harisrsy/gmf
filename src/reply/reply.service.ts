import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilereplyDto } from './reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.replyCreateInput) {
    return await this.prisma.reply.create({
      data,
    });
  }

  findAll() {
    return this.prisma.reply.findMany({
      include: {
        ncr: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.reply.findUnique({
      where: {
        id: +id,
      },
    });
  }

  update(
    id: number,
    data: Prisma.replyUpdateInput,
  ) {
    return this.prisma.reply.update({
      where: {
        id: +id,
      },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.reply.delete({
      where: {
        id: +id,
      },
    });
  }

  async assignNcr(
    replyId: number,
    ncrId: number,
  ) {
    return await this.prisma.reply.update({
      where: {
        id: +replyId,
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
