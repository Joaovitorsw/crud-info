import { VehicleResponse } from '@my-workspace/api-interfaces';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { VehicleRequestDto } from '../dto/vehicle-create.dto';
import { IVehicleService } from '../models/vehicle.service.interface';

@Injectable()
export class VehicleService implements IVehicleService {
  constructor(readonly prismaService: PrismaService) {}
  async create(vehicleRequest: VehicleRequestDto): Promise<VehicleResponse> {
    const vehicleCreate = this.prismaService.vehicle.create({
      data: {
        board: vehicleRequest.board,
        chassi: vehicleRequest.chassi,
        renavam: vehicleRequest.renavam,
        modelo: vehicleRequest.modelo,
        marca: vehicleRequest.marca,
        ano: vehicleRequest.ano,
        createdAt: new Date(),
      },
    });

    const vehicleResponse: VehicleResponse =
      this.createVehicleResponse(vehicleCreate);
    return vehicleResponse;
  }
  async findAll(): Promise<VehicleResponse[]> {
    const vehicles = await this.prismaService.vehicle.findMany();
    const vehiclesResponse: VehicleResponse[] = vehicles.map((vehicle) =>
      this.createVehicleResponse(vehicle)
    );
    return vehiclesResponse;
  }
  async findOne(vehicleID: number): Promise<VehicleResponse> {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: { vehicleID },
    });

    const vehicleResponse: VehicleResponse =
      this.createVehicleResponse(vehicle);

    return vehicleResponse;
  }

  async update(
    vehicleID: number,
    vehicleRequest: VehicleRequestDto
  ): Promise<VehicleResponse> {
    const updateVehicle = this.prismaService.vehicle.update({
      where: { vehicleID },
      data: {
        board: vehicleRequest.board,
        chassi: vehicleRequest.chassi,
        renavam: vehicleRequest.renavam,
        modelo: vehicleRequest.modelo,
        marca: vehicleRequest.marca,
        ano: vehicleRequest.ano,
      },
    });
    const vehicleResponse: VehicleResponse =
      this.createVehicleResponse(updateVehicle);

    return vehicleResponse;
  }
  async delete(vehicleID: number): Promise<boolean> {
    this.prismaService.vehicle.delete({
      where: { vehicleID },
    });

    return true;
  }

  private createVehicleResponse(vehicle): VehicleResponse {
    return {
      vehicleID: vehicle.vehicleID,
      board: vehicle.board,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
    };
  }
}
