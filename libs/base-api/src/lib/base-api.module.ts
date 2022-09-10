import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';

export interface Options<T> {
  [key: string]: T;
}

export type Environment = Options<any> & {
  production: boolean;
  BASE_API_URL: string;
};
export const ENVIRONMENT_TOKEN = new InjectionToken<Environment>('environment');

@NgModule({
  imports: [CommonModule],
})
export class BaseApiModule {}
