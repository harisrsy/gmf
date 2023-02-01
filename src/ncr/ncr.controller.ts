/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NcrService } from './ncr.service';
import { FilencrDto } from './ncr.dto';
import { AuthGuard } from 'src/auth/guards/roles/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('ncr')
export class NcrController {
  constructor(private ncrService: NcrService) {}

  @Get()
  getAllNcr() {
    return this.ncrService.all();
  }

  @Get(':id')
  async getNcr(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const ncr = await this.ncrService.get(+id);
    if (!ncr) {
      throw new NotFoundException(
        'NCR RECORD NOT FOUND',
      );
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
  async removeNcr(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const ncr = await this.ncrService.get(+id);
    if (!ncr) {
      throw new NotFoundException(
        'NCR RECORD NOT FOUND',
      );
    }
    return await this.ncrService.remove(+id);
  }

  @Patch(':id')
  async updateNcr(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: FilencrDto,
  ) {
    const ncr = await this.ncrService.get(+id);
    if (!ncr) {
      throw new NotFoundException(
        'NCR RECORD NOT FOUND',
      );
    }
    return await this.ncrService.update(
      +id,
      body,
    );
  }
}
