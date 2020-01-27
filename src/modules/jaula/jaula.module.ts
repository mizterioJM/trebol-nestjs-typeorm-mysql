import { Module } from '@nestjs/common';
import { JaulaController } from './jaula.controller';
import { JaulaService } from './jaula.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JaulaRepository } from './repository/jaula.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([JaulaRepository]), AuthModule],
  controllers: [JaulaController],
  providers: [JaulaService],
})
export class JaulaModule {}
