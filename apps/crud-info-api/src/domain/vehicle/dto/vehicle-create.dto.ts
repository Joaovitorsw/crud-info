import { VehicleRequest, VehicleResponse } from '@my-workspace/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class VehicleRequestDto implements VehicleRequest {
  @ApiProperty({
    example: 'OAX-5895',
    description: 'Essa é a placa do veículo',
  })
  @IsString()
  board: string;

  @ApiProperty({
    example: '776046489',
    description: 'Esse é o chassi do veículo',
  })
  @IsString()
  chassi: string;

  @ApiProperty({
    example: '9BD15822AC6650210',
    description: 'Esse é o Registro Nacional de um Veículo',
  })
  @IsString()
  renavam: string;

  @ApiProperty({
    example: 'Automóvel Branco',
    description: 'Esse é o modelo do veículo',
  })
  @IsString()
  modelo: string;

  @ApiProperty({
    example: 'Fiat Uno Mille Ec.',
    description: 'Esse é a marca do veículo',
  })
  @IsString()
  marca: string;

  @ApiProperty({
    example: '2011',
    description: 'Esse o ano de fabricação do veículo',
  })
  @MinLength(4)
  @MaxLength(4)
  @IsString()
  ano: string;
}
export class VehicleResponseDto implements VehicleResponse {
  @ApiProperty({
    example: 1,
    description:
      'Esse é  o identificador único de um veículo no banco de dados',
  })
  @IsNumber()
  vehicleID: number;

  @ApiProperty({
    example: 'OAX-5895',
    description: 'Esse é a placa do veículo',
  })
  @IsString()
  board: string;

  @ApiProperty({
    example: '9BD15822AC6650210',
    description: 'Esse é o chassi do veículo',
  })
  @IsString()
  chassi: string;

  @ApiProperty({
    example: '776046489',
    description: 'Esse é o Registro Nacional de um Veículo',
  })
  @IsString()
  renavam: string;

  @ApiProperty({
    example: 'Automóvel Branco',
    description: 'Esse é o modelo do veículo',
  })
  @IsString()
  modelo: string;

  @ApiProperty({
    example: 'Fiat Uno Mille Ec.',
    description: 'Essa é a marca do veículo',
  })
  @IsString()
  marca: string;

  @ApiProperty({
    example: '2011',
    description: 'Esse é a o ano de fabricação do veículo',
  })
  @MinLength(4)
  @MaxLength(6)
  @IsString()
  ano: string;
}
