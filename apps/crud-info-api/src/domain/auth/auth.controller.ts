/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SignUpResponse, TokenResponse } from '@my-workspace/api-interfaces';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dtos/sign-in.dto';
import { SignUpRequestDto } from './dtos/sign-up.dto';
import { eAuthMessage } from './models/auth.enum';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpRequest: SignUpRequestDto
  ): Promise<TokenResponse & SignUpResponse> {
    try {
      const token = await this.authService.signUp(signUpRequest);
      const user = this.authService.currentUser();
      return { ...token, ...user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new HttpException(
          eAuthMessage.EMAIL_ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST
        );

      throw error;
    }
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInRequest: SignInRequestDto
  ): Promise<TokenResponse & SignUpResponse> {
    const token = await this.authService.signIn(signInRequest);
    const user = this.authService.currentUser();
    return { ...token, ...user };
  }
}
