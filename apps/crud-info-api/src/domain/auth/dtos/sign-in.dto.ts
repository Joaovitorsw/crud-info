import { SignInRequest } from '@my-workspace/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInRequestDto implements SignInRequest {
  @ApiProperty({
    description: 'O email do usuário',
    default: 'joaovitorsw@teste.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    default: '123456',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
