import { SignUpRequest } from '@my-workspace/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpRequestDto implements SignUpRequest {
  @ApiProperty({
    description: 'O nome do usuário a ser criado',
    default: 'João Vitor',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'O email do usuário a ser criado',
    default: 'joaovitorsw@teste.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário a ser criada',
    default: '123456',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
