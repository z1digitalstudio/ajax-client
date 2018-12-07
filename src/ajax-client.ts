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

  get<T>(
    url: string,
    options?: Partial<AjaxClientRequest<null>>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T, null>({
      url,
      method: 'GET',
      ...options
    });
  }

  post<T, Y>(
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

  put<T, Y>(
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

  patch<T, Y>(
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

  delete<T, Y>(
    url: string,
    options?: Partial<AjaxClientRequest<null>>
  ): Observable<AjaxClientResponse<T>> {
    return this.request<T, null>({
      url,
      method: 'DELETE',
      ...options
    });
  }

  request<T, Y>(
    options: Partial<AjaxClientRequest<Y>>
  ): Observable<AjaxClientResponse<T>> {
    return this.ajaxInstance(this.interceptRequest<Y>(options)).pipe(
      map(res => this.interceptResponse<T>(res as AjaxClientResponse<T>))
    );
  }

  private interceptResponse<T>(
    response: AjaxClientResponse<T>
  ): AjaxClientResponse<T> {
    for (const interceptor of this.interceptors.response) {
      response = interceptor(response);
    }
    return response;
  }

  private interceptRequest<T>(
    request: Partial<AjaxClientRequest<T>>
  ): Partial<AjaxClientRequest<T>> {
    for (const interceptor of this.interceptors.request) {
      request = interceptor(request);
    }

    return request;
  }
}
