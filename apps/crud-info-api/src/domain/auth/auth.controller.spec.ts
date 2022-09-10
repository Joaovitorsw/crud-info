import { SignInRequest, TokenResponse } from '@my-workspace/api-interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dtos';

const SIGN_IN_REQUEST_DTO: SignInRequest = {
  email: 'joaovitorsw@teste.com',
  password: '123456',
};
const SIGN_UP_REQUEST_DTO: SignUpRequestDto = {
  name: 'João Vitor',
  email: 'joaovitorsw@teste.com',
  password: '123456',
};
const AUTH_RESPONSE: TokenResponse = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImVtYWlsIjoiam9hb3ZpdG9yc3dAdGVzdGUuY29tIiwibmFtZSI6Ikpvw6NvIFZpdG9yIiwiaWF0IjoxNjYyODI5Nzg1LCJleHAiOjE2NjI4MzMzODV9.CkDtptYJDUBlvf4q9qx9mAf4prABV4JvVZlMhgIbkKg',
};
describe('VehicleController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(AUTH_RESPONSE),
            signUp: jest.fn().mockResolvedValue(AUTH_RESPONSE),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });
  describe('signIn', () => {
    it('should return jwt token', async () => {
      const result = await authService.signIn(SIGN_IN_REQUEST_DTO);
      expect(result).toEqual(AUTH_RESPONSE);
    });
  });

  describe('signUp', () => {
    it('should return jwt token', async () => {
      const result = await authService.signUp(SIGN_UP_REQUEST_DTO);
      expect(result).toEqual(AUTH_RESPONSE);
    });
  });
});
