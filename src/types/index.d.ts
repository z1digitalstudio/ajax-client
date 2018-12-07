import { AjaxResponse, AjaxRequest } from 'rxjs/ajax';

export interface AjaxClientResponse<T = object> extends AjaxResponse {
  response: T;
}

export interface AjaxClientRequest<T = object> extends AjaxRequest {
  body: T;
}

export type RequestInterceptor = (
  options: Partial<AjaxRequest>
) => Partial<AjaxRequest>;

export type ResponseInterceptor = <T>(
  response: AjaxClientResponse<T>
) => AjaxClientResponse<T>;

export interface Interceptors {
  request: RequestInterceptor[];
  response: ResponseInterceptor[];
}
