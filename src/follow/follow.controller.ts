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
import { FilefollowDto } from './follow.dto';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';



@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('follow')
export class FollowController {
  constructor(
    private readonly followService: FollowService,
  ) {}
  
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.followService.findAll();
  }
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async getFollow(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const follow =
      await this.followService.findOne(+id);
    if (!follow) {
      throw new NotFoundException(
        'FOLLOW RECORD NOT FOUND',
      );
    }
    return this.followService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Post()
  async addfollow(
    @Body()
    body: FilefollowDto,
  ) {
    return await this.followService.create(body);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateFollow(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: FilefollowDto,
  ) {
    const follow =
      await this.followService.findOne(+id);
    if (!follow) {
      throw new NotFoundException(
        'FOLLOW RECORD NOT FOUND',
      );
    }
    return await this.followService.update(
      +id,
      body,
    );
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async removefollow(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const follow =
      await this.followService.findOne(+id);
    if (!follow) {
      throw new NotFoundException(
        'FOLLOW RECORD NOT FOUND',
      );
    }
    return this.followService.remove(+id);
  }

  @Roles(Role.ADMIN)
  @Patch('update/assign-follow')
  async assignFollow(
    @Body()
    body: {
      followId: number;
      ncrId: number;
    },
  ) {
    return await this.followService.assignFollow(
      body.followId,
      body.ncrId,
    );
  }
}
