import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NcrModule } from 'src/ncr/ncr.module';
import { ReplyModule } from 'src/reply/reply.module';
import { FollowModule } from 'src/follow/follow.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [PrismaModule, NcrModule, ReplyModule, FollowModule, AuthModule, UsersModule, RolesGuard],
  controllers: [],
  providers: [],
})
export class AppModule {}
