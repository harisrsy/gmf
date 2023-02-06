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
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ncr')
export class NcrController {
  constructor(private ncrService: NcrService) {}

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  getAllNcr() {
    return this.ncrService.all();
  }
 @Roles(Role.ADMIN, Role.USER)
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

  @Roles(Role.ADMIN)
  @Post()
  async addNcr(
    @Body()
    body: FilencrDto,
  ) {
    return await this.ncrService.create(body);
  }

  @Roles(Role.ADMIN)
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

  @Roles(Role.ADMIN)
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
