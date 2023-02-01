import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { FilereplyDto } from './reply.dto';
import { AuthGuard } from 'src/auth/guards/roles/auth.guard';

@UseGuards(AuthGuard)
@Controller('reply')
export class ReplyController {
  constructor(
    private readonly replyService: ReplyService,
  ) {}

  @Get()
  getAllReply() {
    return this.replyService.findAll();
  }

  @Get(':id')
  async getReply(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const reply = await this.replyService.findOne(
      +id,
    );
    if (!reply) {
      throw new NotFoundException(
        'REPLY RECORD NOT FOUND',
      );
    }
    return this.replyService.findOne(+id);
  }

  @Post()
  async addReply(
    @Body()
    body: FilereplyDto,
  ) {
    return await this.replyService.create(body);
  }

  @Delete(':id')
  async removeReply(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const reply = await this.replyService.findOne(
      +id,
    );
    if (!reply) {
      throw new NotFoundException(
        'REPLY RECORD NOT FOUND',
      );
    }
    return await this.replyService.remove(+id);
  }

  @Patch(':id')
  async updateReply(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: FilereplyDto,
  ) {
    const reply = await this.replyService.findOne(
      +id,
    );
    if (!reply) {
      throw new NotFoundException(
        'REPLY RECORD NOT FOUND',
      );
    }
    return await this.replyService.update(
      +id,
      body,
    );
  }
  @Patch('update/assign-reply')
  async assignKelas(
    @Body()
    body: {
      replyId: number;
      ncrId: number;
    },
  ) {
    return await this.replyService.assignNcr(
      body.replyId,
      body.ncrId,
    );
  }
}
