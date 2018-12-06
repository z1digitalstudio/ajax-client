import { AjaxRequest } from 'rxjs/ajax';
import { AjaxClient } from './ajax-client';
import { of } from 'rxjs/internal/observable/of';
import { AjaxClientResponse } from './types';

describe('ajax-client.ts', () => {
  let ajaxClient: AjaxClient;
  beforeEach(() => {
    jest.resetAllMocks();
    ajaxClient = new AjaxClient();
  });

  it('should call "ajaxInstance" on "request" method', () => {
    const options: Partial<AjaxRequest> = {
      method: 'testMethod'
    };
    const mockedAjaxInstance = jest.fn();
    ajaxClient.ajaxInstance = mockedAjaxInstance as any;

    mockedAjaxInstance.mockReturnValue(of(null));

    ajaxClient.request(options);
    expect(ajaxClient.ajaxInstance).toHaveBeenCalledWith(options);
  });

  it('should intercept requests', () => {
    const options: Partial<AjaxRequest> = {
      method: 'testMethod'
    };

    const mockedAjaxInstance = jest.fn();
    ajaxClient.ajaxInstance = mockedAjaxInstance as any;

    mockedAjaxInstance.mockReturnValue(of(null));

    const interceptor = (req: Partial<AjaxRequest>) => ({
      ...req,
      headers: {
        ...req.headers,
        test: 'test'
      }
    });
    ajaxClient.interceptors.request.push(interceptor);

    ajaxClient.request(options);

    expect(mockedAjaxInstance).toHaveBeenCalledWith(interceptor(options));
  });

  it('should intercept responses', done => {
    const options: Partial<AjaxRequest> = {
      method: 'testMethod'
    };

    const mockedAjaxInstance = jest.fn();
    ajaxClient.ajaxInstance = mockedAjaxInstance as any;

    const mockedResponse = { test: 'test' };
    mockedAjaxInstance.mockReturnValue(of(mockedResponse));

    const interceptor = (res: AjaxClientResponse<any>) => ({
      ...res,
      test2: 'test 2'
    });
    ajaxClient.interceptors.response.push(interceptor);

    ajaxClient.request(options).subscribe(res => {
      expect(res).toEqual(interceptor(mockedResponse as any));
      done();
    });
  });

  it('should use "request" method to generate "get" requests', () => {
    const options: Partial<AjaxRequest> = {
      method: 'testMethod'
    };
    const url = 'www.test.com';
    const mockedRequestMethod = jest.fn();
    const mockedResponse = { test: 'test' };
    ajaxClient.request = mockedRequestMethod;
    mockedRequestMethod.mockReturnValue(of(mockedResponse));

    ajaxClient.get(url, options);
    expect(mockedRequestMethod).toHaveBeenCalledWith({
      url,
      method: 'GET',
      ...options
    });
  });

  it('should use "request" method to generate "post" requests', () => {
    const options: Partial<AjaxRequest> = {
      method: 'testMethod'
    };
    const body = { testBody: 'testBody' };
    const url = 'www.test.com';
    const mockedRequestMethod = jest.fn();
    const mockedResponse = { test: 'test' };
    ajaxClient.request = mockedRequestMethod;
    mockedRequestMethod.mockReturnValue(of(mockedResponse));

    ajaxClient.post(url, body, options);
    expect(mockedRequestMethod).toHaveBeenCalledWith({
      url,
      body,
      method: 'POST',
      ...options
    });
  });

  it('should use "request" method to generate "put" requests', () => {
    const options: Partial<AjaxRequest> = {
      method: 'testMethod'
    };
    const body = { testBody: 'testBody' };
    const url = 'www.test.com';
    const mockedRequestMethod = jest.fn();
    const mockedResponse = { test: 'test' };
    ajaxClient.request = mockedRequestMethod;
    mockedRequestMethod.mockReturnValue(of(mockedResponse));

    ajaxClient.put(url, body, options);
    expect(mockedRequestMethod).toHaveBeenCalledWith({
      url,
      body,
      method: 'PUT',
      ...options
    });
  });

  it('should use "request" method to generate "patch" requests', () => {
    const options: Partial<AjaxRequest> = {
      method: 'testMethod'
    };
    const body = { testBody: 'testBody' };
    const url = 'www.test.com';
    const mockedRequestMethod = jest.fn();
    const mockedResponse = { test: 'test' };
    ajaxClient.request = mockedRequestMethod;
    mockedRequestMethod.mockReturnValue(of(mockedResponse));

    ajaxClient.patch(url, body, options);
    expect(mockedRequestMethod).toHaveBeenCalledWith({
      url,
      body,
      method: 'PATCH',
      ...options
    });
  });

  it('should use "request" method to generate "delete" requests', () => {
    const options: Partial<AjaxRequest> = {
      method: 'testMethod'
    };
    const url = 'www.test.com';
    const mockedRequestMethod = jest.fn();
    const mockedResponse = { test: 'test' };
    ajaxClient.request = mockedRequestMethod;
    mockedRequestMethod.mockReturnValue(of(mockedResponse));

    ajaxClient.delete(url, options);
    expect(mockedRequestMethod).toHaveBeenCalledWith({
      url,
      method: 'DELETE',
      ...options
    });
  });
});
