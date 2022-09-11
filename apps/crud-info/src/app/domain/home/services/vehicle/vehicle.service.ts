import { Inject, Injectable, Injector } from '@angular/core';
import { VehicleRequest, VehicleResponse } from '@my-workspace/api-interfaces';
import {
  BaseApiService,
  Environment,
  ENVIRONMENT_TOKEN,
} from '@my-workspace/base-api';

@Injectable({
  providedIn: 'root',
})
export class VehicleService extends BaseApiService<VehicleService> {
  constructor(
    @Inject(ENVIRONMENT_TOKEN) readonly environment: Environment,
    override readonly injector: Injector
  ) {
    super('vehicle', injector, environment.BASE_API_URL);
  }

  getVehicleById = (id: string | number) => this.getById<VehicleResponse>(id);

  getVehicles = () => this.getAll<VehicleResponse>();

  createVehicle = (vehicle: VehicleRequest) =>
    this.create<VehicleRequest, VehicleResponse>(vehicle);

  updateVehicle = (vehicle: VehicleRequest) =>
    this.update<VehicleRequest, VehicleResponse>(vehicle);

  deleteVehicle = (id: string | number) => this.delete(id);
}
