import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService<T> {
  readonly httpClient: HttpClient;
  constructor(
    @Inject('CONTEXT') readonly CONTEXT: string,
    protected injector: Injector,
    @Inject('BASE_URL') readonly BASE_URL: string
  ) {
    this.httpClient = injector.get(HttpClient);
  }

  protected getAll<T>(params?: {
    [param: string]: string | number;
  }): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.BASE_URL}${this.CONTEXT}`, {
      params,
    });
  }

  protected getById<T>(id: string | number) {
    return this.httpClient.get<T>(`${this.BASE_URL}${this.CONTEXT}/${id}`);
  }

  protected create<T, C>(resource: T): Observable<C> {
    return this.httpClient.post<C>(`${this.BASE_URL}${this.CONTEXT}`, resource);
  }
  protected update<T, C>(resource: T): Observable<C> {
    return this.httpClient.put<C>(`${this.BASE_URL}${this.CONTEXT}`, resource);
  }

  protected updateById<T>(id: string, resource: T): Observable<T> {
    return this.httpClient.put<T>(
      `${this.BASE_URL}${this.CONTEXT}/${id}`,
      resource
    );
  }

  protected delete<T>(id: string | number) {
    return this.httpClient.delete<T>(`${this.BASE_URL}${this.CONTEXT}/${id}`);
  }

  getQueryString(queryParams: { [key: string]: any }) {
    const queryEntries = Object.entries(queryParams);
    const filteredQuery = queryEntries.filter(
      ([key, value]) => typeof value !== 'undefined'
    );
    return filteredQuery
      .map(([key, value]) => {
        if (value === 'null' || typeof value === 'undefined') return '';
        return `${key}=${value}`;
      })
      .join('&');
  }
}
