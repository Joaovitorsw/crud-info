import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './domain/auth';
import { PrismaModule } from './domain/prisma';
import { VehicleModule } from './domain/vehicle/vehicle.module';
@Module({
  imports: [
    PrismaModule,
    VehicleModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'crud-info'),
    }),
  ],
})
export class AppModule {}
