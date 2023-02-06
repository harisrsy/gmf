import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilereplyDto } from './reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.replyCreateManyInput) {
    const {ncrId} = data
    const cek = await this.prisma.reply.findUnique({
      where: {id: ncrId}
    });

    if (!cek) {
      throw new BadRequestException(`NCR with id "${ncrId}" does not exist.`);
    }

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
}
