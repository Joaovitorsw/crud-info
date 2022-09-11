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
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService<AuthService> {
  readonly SING_UP_ROUTER = 'sign-up';
  readonly SING_IN_ROUTER = 'sign-in';
  user$: ReplaySubject<SignUpResponse & TokenResponse> = new ReplaySubject(1);
  constructor(
    @Inject(ENVIRONMENT_TOKEN) readonly environment: Environment,
    override readonly injector: Injector
  ) {
    super('auth', injector, environment.BASE_API_URL);
    const loginRequest = sessionStorage.getItem('loginRequest');
    if (loginRequest) {
      const request = JSON.parse(loginRequest);
      this.login(request).subscribe();
    }
  }

  createUser(request: SignUpRequest) {
    const httpClientRequest = this.httpClient.post<
      TokenResponse & SignUpResponse
    >(`${this.BASE_URL}${this.CONTEXT}/${this.SING_UP_ROUTER}`, request);

    return this.setUser(httpClientRequest, request);
  }

  setUser(
    observable: Observable<SignUpResponse & TokenResponse>,
    request: SignInRequest
  ) {
    return observable.pipe(
      tap((user) => {
        const stringifyRequest = JSON.stringify(request);
        sessionStorage.setItem('loginRequest', stringifyRequest);
        this.user$.next(user);
      })
    );
  }

  login(request: SignInRequest) {
    const httpClientRequest = this.httpClient.post<
      TokenResponse & SignUpResponse
    >(`${this.BASE_URL}${this.CONTEXT}/${this.SING_IN_ROUTER}`, request);

    return this.setUser(httpClientRequest, request);
  }
}
