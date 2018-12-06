import { Observable } from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Interceptors, AjaxClientResponse } from './types';

export class AjaxClient {
  ajaxInstance = ajax;

  interceptors: Interceptors = {
    request: [],
    response: []
  };

  get<T = object>(
    url: string,
    options?: Partial<AjaxRequest>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      ...options
    });
  }

  post<T = object, Y = object>(
    url: string,
    body: Y,
    options?: Partial<AjaxRequest>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T>({
      url,
      body,
      method: 'POST',
      ...options
    });
  }

  put<T = object, Y = object>(
    url: string,
    body: Y,
    options?: Partial<AjaxRequest>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T>({
      url,
      body,
      method: 'PUT',
      ...options
    });
  }

  patch<T = object, Y = object>(
    url: string,
    body: Y,
    options?: Partial<AjaxRequest>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T>({
      url,
      body,
      method: 'PATCH',
      ...options
    });
  }

  delete<T = object>(
    url: string,
    options?: Partial<AjaxRequest>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      ...options
    });
  }

  request<T = object>(
    options: Partial<AjaxRequest>
  ): Observable<AjaxClientResponse<T>> {
    return this.ajaxInstance(this.interceptRequest(options)).pipe(
      map(res => this.interceptResponse<T>(res as AjaxClientResponse<T>))
    );
  }

  private interceptResponse<T = object>(
    response: AjaxClientResponse<T>
  ): AjaxClientResponse<T> {
    for (const interceptor of this.interceptors.response) {
      response = interceptor(response);
    }
    return response;
  }

  private interceptRequest(
    request: Partial<AjaxRequest>
  ): Partial<AjaxRequest> {
    for (const interceptor of this.interceptors.request) {
      request = interceptor(request);
    }

    return request;
  }
}
