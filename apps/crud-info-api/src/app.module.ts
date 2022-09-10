import { Module } from '@nestjs/common';
import { AuthModule } from './domain/auth';
import { PrismaModule } from './domain/prisma';
import { VehicleModule } from './domain/vehicle/vehicle.module';

@Module({
  imports: [PrismaModule, VehicleModule, AuthModule],
})
export class AppModule {}
