/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NcrService {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  all() {
    return this.prisma.ncr.findMany({
      include: {
        reply: true,
        follow: true,
      },
    });
  }

  get(id?: number) {
    return this.prisma.ncr.findFirst({
      where: {
        id: id,
      },
      include: {
        reply: true,
        follow: true,
      },
    });
  }

  async create(data: Prisma.ncrCreateInput) {
    return await this.prisma.ncr.create({
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.ncr.delete({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.ncrUpdateInput,
  ) {
    return await this.prisma.ncr.update({
      where: {
        id: id,
      },
      data,
    });
  }
}
