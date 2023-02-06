/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
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
    const { ncr_no,  } = data;
    const ncrExists = await this.prisma.ncr.findUnique({
      where: { ncr_no},
    });

    if (ncrExists) {
      throw new BadRequestException('NCR No already exists');
    }
    const {audit_plan_no } = data;
    const apExists = await this.prisma.ncr.findUnique({
      where: { audit_plan_no},
    });

    if (apExists) {
      throw new BadRequestException('Audit Plan No already exists');
    }
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
