import { Module } from '@nestjs/common';
import { VehicleService } from './service/vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [
    {
      provide: VehicleService,
      useClass: VehicleService,
    },
  ],
})
export class VehicleModule {}
