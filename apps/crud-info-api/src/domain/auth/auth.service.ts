import {
  SignUpRequest,
  SignUpResponse,
  TokenResponse,
} from '@my-workspace/api-interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as argon from 'argon2';
import { PrismaService } from '../prisma';
import { SignInRequestDto } from './dtos/sign-in.dto';
import { eAuthMessage } from './models/auth.enum';

@Injectable()
export class AuthService {
  responseUser: SignUpResponse;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(userRequest: SignInRequestDto): Promise<TokenResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: userRequest.email,
      },
    });

    if (!user)
      throw new HttpException(
        eAuthMessage.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED
      );

    const passwordMatches = await argon.verify(
      user.password,
      userRequest.password
    );
    if (!passwordMatches)
      throw new HttpException(
        eAuthMessage.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED
      );

    const responseUser: SignUpResponse = {
      userID: user.userID,
      name: user.name,
      email: user.email,
    };

    this.responseUser = responseUser;

    const token = await this.generateToken(responseUser);
    return token;
  }

  currentUser(): SignUpResponse {
    return this.responseUser;
  }

  async signUp(userRequest: SignUpRequest): Promise<TokenResponse> {
    const user = await this.createUser(userRequest);
    const token = await this.generateToken(user);
    return token;
  }

  async createUser(userRequest: SignUpRequest): Promise<{
    name: string;
    email: string;
    userID: number;
  }> {
    const passwordHash = await argon.hash(userRequest.password);

    const user = await this.prismaService.user.create({
      data: {
        name: userRequest.name,
        email: userRequest.email,
        password: passwordHash,
      },
      select: {
        userID: true,
        email: true,
        name: true,
      },
    });
    this.responseUser = user;

    return user;
  }

  private async generateToken(user: SignUpResponse): Promise<TokenResponse> {
    const payload = {
      userID: user.userID,
      email: user.email,
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });

    return { accessToken: token };
  }
}
