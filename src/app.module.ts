import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { NcrModule } from './ncr/ncr.module';
import { ReplyModule } from './reply/reply.module';
import { FollowModule } from './follow/follow.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, NcrModule, ReplyModule, FollowModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
