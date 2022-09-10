import { Inject, Injectable, Injector } from '@angular/core';
import {
  SignInRequest,
  SignUpRequest,
  SignUpResponse,
  TokenResponse,
} from '@my-workspace/api-interfaces';
import {
  BaseApiService,
  Environment,
  ENVIRONMENT_TOKEN,
} from '@my-workspace/base-api';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService<AuthService> {
  readonly SING_UP_ROUTER = 'sign-up';
  readonly SING_IN_ROUTER = 'sign-in';

  constructor(
    @Inject(ENVIRONMENT_TOKEN) readonly environment: Environment,
    override readonly injector: Injector
  ) {
    super('auth', injector, environment.BASE_API_URL);
  }

  createUser(request: SignUpRequest) {
    return this.httpClient.post<TokenResponse & SignUpResponse>(
      `${this.BASE_URL}${this.CONTEXT}/${this.SING_UP_ROUTER}`,
      request
    );
  }

  login(request: SignInRequest) {
    return this.httpClient.post<TokenResponse & SignUpResponse>(
      `${this.BASE_URL}${this.CONTEXT}/${this.SING_IN_ROUTER}`,
      request
    );
  }
}
