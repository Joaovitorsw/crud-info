import { UserAuthPayload } from '@my-workspace/api-interfaces';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserAuthPayload): Promise<UserAuthPayload> {
    const user = await this.prismaService.user.findUnique({
      where: {
        userID: payload.userID,
      },
    });

    return {
      userID: user.userID,
      username: user.name,
      email: user.email,
    };
  }
}
