import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [PrismaModule],
  providers: [ReplyService, JwtStrategy],
  controllers: [ReplyController],
})
export class ReplyModule {}
