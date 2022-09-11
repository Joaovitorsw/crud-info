import { VehicleResponse } from '@my-workspace/api-interfaces';
import { VehicleRequestDto } from '../dto/vehicle-create.dto';

export interface IVehicleService {
  create(vehicleRequest: VehicleRequestDto): Promise<VehicleResponse>;
  findAll(): Promise<VehicleResponse[]>;
  findOne(vehicleID: number): Promise<VehicleResponse>;
  update(vehicleRequest: VehicleResponse): Promise<VehicleResponse>;
  delete(vehicleID: number): Promise<boolean>;
}

export type VehicleService = IVehicleService;
