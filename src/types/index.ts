import { AjaxResponse, AjaxRequest } from 'rxjs/ajax';

export interface AjaxClientResponse<T = any> extends AjaxResponse {
  response: T;
}

export interface AjaxClientRequest<T = any> extends AjaxRequest {
  body: T;
}

export type RequestInterceptor = (
  options: Partial<AjaxClientRequest<any>>
) => Partial<AjaxClientRequest<any>>;

export type ResponseInterceptor = (
  response: AjaxClientResponse<any>
) => AjaxClientResponse<any>;

export interface Interceptors {
  request: RequestInterceptor[];
  response: ResponseInterceptor[];
}
