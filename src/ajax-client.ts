import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Interceptors, AjaxClientResponse, AjaxClientRequest } from './types';

export class AjaxClient {
  ajaxInstance = ajax;

  interceptors: Interceptors = {
    request: [],
    response: []
  };

  get<T = any>(
    url: string,
    options?: Partial<AjaxClientRequest<null>>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T, null>({
      url,
      method: 'GET',
      ...options
    });
  }

  post<T = any, Y = any>(
    url: string,
    body: Y,
    options?: Partial<AjaxClientRequest<Y>>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T, Y>({
      url,
      body,
      method: 'POST',
      ...options
    });
  }

  put<T = any, Y = any>(
    url: string,
    body: Y,
    options?: Partial<AjaxClientRequest<Y>>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T, Y>({
      url,
      body,
      method: 'PUT',
      ...options
    });
  }

  patch<T = any, Y = any>(
    url: string,
    body: Y,
    options?: Partial<AjaxClientRequest<Y>>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T, Y>({
      url,
      body,
      method: 'PATCH',
      ...options
    });
  }

  delete<T = any>(
    url: string,
    options?: Partial<AjaxClientRequest<null>>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T, null>({
      url,
      method: 'DELETE',
      ...options
    });
  }

  request<T = any, Y = any>(
    options: Partial<AjaxClientRequest<Y>>
  ): Observable<AjaxClientResponse<T>> {
    return this.ajaxInstance(this.interceptRequest<Y>(options)).pipe(
      map(res => this.interceptResponse<T>(res as AjaxClientResponse<T>))
    );
  }

  private interceptResponse<T = any>(
    response: AjaxClientResponse<T>
  ): AjaxClientResponse<T> {
    for (const interceptor of this.interceptors.response) {
      response = interceptor(response);
    }
    return response;
  }

  private interceptRequest<T = any>(
    request: Partial<AjaxClientRequest<T>>
  ): Partial<AjaxClientRequest<T>> {
    for (const interceptor of this.interceptors.request) {
      request = interceptor(request);
    }

    return request;
  }
}
