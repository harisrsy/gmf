/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NcrService } from './ncr.service';
import { FilencrDto } from './ncr.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('ncr')
export class NcrController {
  constructor(private ncrService: NcrService) {}

  @Get()
  async getAllNcr(@Req() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Forbidden');
    }
    return this.ncrService.all();
  }

  @Get(':id')
  async getNcr(@Param('id', ParseIntPipe) id: number) {
    const ncr = await this.ncrService.get(+id);
    if (!ncr) {
      throw new NotFoundException('NCR RECORD NOT FOUND');
    }
    return this.ncrService.get(+id);
  }

  @Post()
  async addNcr(
    @Body()
    body: FilencrDto,
  ) {
    return await this.ncrService.create(body);
  }

  @Delete(':id')
  async removeNcr(@Param('id', ParseIntPipe) id: number) {
    const ncr = await this.ncrService.get(+id);
    if (!ncr) {
      throw new NotFoundException('NCR RECORD NOT FOUND');
    }
    return await this.ncrService.remove(+id);
  }

  @Patch(':id')
  async updateNcr(
    @Param('id') id: number,
    @Body()
    body: FilencrDto,
  ) {
    return await this.ncrService.update(+id, body);
  }
}
