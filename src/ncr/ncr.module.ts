import { Module } from '@nestjs/common';
import { NcrService } from './ncr.service';
import { NcrController } from './ncr.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NcrService],
  controllers: [NcrController]
})
export class NcrModule {}
