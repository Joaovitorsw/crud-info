import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthenticatedUserResponseDto } from '../../shared/models/unauthenticated-user.dto';
import { JwtGuard } from '../auth';
import {
  VehicleRequestDto,
  VehicleResponseDto,
} from './dto/vehicle-create.dto';
import { VehicleService } from './service/vehicle.service';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags('Veiculo')
@Controller('vehicle')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  type: UnauthenticatedUserResponseDto,
})
export class VehicleController {
  constructor(readonly vehicleService: VehicleService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [VehicleResponseDto],
  })
  getAllVehicle() {
    return this.vehicleService.findAll();
  }

  @Get(':vehicleID')
  @ApiResponse({
    status: HttpStatus.OK,
    type: VehicleResponseDto,
  })
  getVehicleById(@Param('vehicleID') vehicleID: number) {
    return this.vehicleService.findOne(vehicleID);
  }

  @Post()
  @ApiBody({ type: VehicleRequestDto })
  @ApiResponse({ type: VehicleResponseDto })
  createVehicle(@Body() vehicleRequestDto: VehicleRequestDto) {
    return this.vehicleService.create(vehicleRequestDto);
  }

  @Put()
  @ApiBody({ type: VehicleResponseDto })
  @ApiResponse({ type: VehicleResponseDto })
  updateVehicle(@Body() vehicleRequestDto: VehicleResponseDto) {
    return this.vehicleService.update(vehicleRequestDto);
  }

  @Delete(':vehicleID')
  @ApiResponse({ type: Boolean })
  deleteVehicle(@Param('vehicleID') vehicleID: number) {
    return this.vehicleService.delete(vehicleID);
  }
}
