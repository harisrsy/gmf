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
} from '@nestjs/common';
import { FilefollowDto } from './follow.dto';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get()
  findAll() {
    return this.followService.findAll();
  }

  @Get(':id')
  async getFollow(@Param('id', ParseIntPipe) id: number) {
    const follow = await this.followService.findOne(+id);
    if (!follow) {
      throw new NotFoundException('FOLLOW RECORD NOT FOUND');
    }
    return this.followService.findOne(+id);
  }

  @Post()
  async addfollow(
    @Body()
    body: FilefollowDto,
  ) {
    return await this.followService.create(body);
  }

  @Patch(':id')
  async updateFollow(
    @Param('id') id: number,
    @Body()
    body: FilefollowDto,
  ) {
    return await this.followService.update(+id, body);
  }

  @Delete(':id')
  async removefollow(@Param('id', ParseIntPipe) id: number) {
    const follow = await this.followService.findOne(+id);
    if (!follow) {
      throw new NotFoundException('FOLLOW RECORD NOT FOUND');
    }
    return this.followService.remove(+id);
  }

  @Patch('update/assign-follow')
  async assignFollow(
    @Body()
    body: {
      followId: number;
      ncrId: number;
    },
  ) {
    return await this.followService.assignFollow(body.followId, body.ncrId);
  }
}
