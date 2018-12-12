import {
  AjaxClient,
  AjaxClientResponse,
  AjaxClientRequest
} from './ajax-client';
import { of } from 'rxjs/internal/observable/of';

describe('ajax-client.ts', () => {
  let ajaxClient: AjaxClient;
  beforeEach(() => {
    jest.resetAllMocks();
    ajaxClient = new AjaxClient();
  });

  it('should call "ajaxInstance" on "request" method', () => {
    const options: Partial<AjaxClientRequest> = {
      method: 'testMethod'
    };
    const mockedAjaxInstance = jest.fn();
    ajaxClient.ajaxInstance = mockedAjaxInstance as any;

    mockedAjaxInstance.mockReturnValue(of(null));

    ajaxClient.request(options);
    expect(ajaxClient.ajaxInstance).toHaveBeenCalledWith(options);
  });

  it('should intercept requests', () => {
    const options: Partial<AjaxClientRequest> = {
      method: 'testMethod'
    };

    const mockedAjaxInstance = jest.fn();
    ajaxClient.ajaxInstance = mockedAjaxInstance as any;

    mockedAjaxInstance.mockReturnValue(of(null));

    const interceptor = (req: Partial<AjaxClientRequest>) => ({
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
    const options: Partial<AjaxClientRequest> = {
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
    const options: Partial<AjaxClientRequest<null>> = {
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
    const options: Partial<AjaxClientRequest> = {
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
    const options: Partial<AjaxClientRequest> = {
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
    const options: Partial<AjaxClientRequest> = {
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
    const options: Partial<AjaxClientRequest<null>> = {
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

  it('should accepts both type definitions on request and options', done => {
    const body = { testBody: 'test' };
    const options: Partial<AjaxClientRequest<typeof body>> = {
      body
    };

    expect(options.body.testBody).toEqual('test');

    const url = 'www.test.com';
    const mockedResponse = { testResponse: 'response' };
    const mockedAjaxRespone: Partial<
      AjaxClientResponse<typeof mockedResponse>
    > = { response: mockedResponse };
    const mockedRequestMethod = jest.fn();
    ajaxClient.request = mockedRequestMethod;
    mockedRequestMethod.mockReturnValue(of(mockedAjaxRespone));

    ajaxClient
      .post<typeof mockedResponse, typeof body>(url, body, options)
      .subscribe(res => {
        expect(res.response.testResponse).toEqual(mockedResponse.testResponse);
        done();
      });
  });

  it('should handle untyped body', done => {
    const body = { testBody: 'test' };
    const options = {
      body
    };

    expect(options.body.testBody).toEqual('test');

    const url = 'www.test.com';
    const mockedResponse = { testResponse: 'response' };
    const mockedAjaxRespone: Partial<
      AjaxClientResponse<typeof mockedResponse>
    > = {
      response: mockedResponse
    };
    const mockedRequestMethod = jest.fn();
    ajaxClient.request = mockedRequestMethod;
    mockedRequestMethod.mockReturnValue(of(mockedAjaxRespone));

    ajaxClient
      .post<typeof mockedResponse>(url, body, options)
      .subscribe(res => {
        expect(res.response.testResponse).toEqual(mockedResponse.testResponse);
        done();
      });
  });

  it('should handle untyped response and body', done => {
    const body = { testBody: 'test' };
    const options = {
      body
    };

    expect(options.body.testBody).toEqual('test');

    const url = 'www.test.com';
    const mockedResponse = { testResponse: 'response' };
    const mockedAjaxRespone = {
      response: mockedResponse
    };
    const mockedRequestMethod = jest.fn();
    ajaxClient.request = mockedRequestMethod;
    mockedRequestMethod.mockReturnValue(of(mockedAjaxRespone));

    ajaxClient.post(url, body, options).subscribe(res => {
      expect(res.response.testResponse).toEqual(mockedResponse.testResponse);
      done();
    });
  });

  it('should add "baseUrl" to all request if is passed as constructor options param', () => {
    const baseUrl = 'test-base-url.com';
    ajaxClient = new AjaxClient({ baseUrl });

    const options: Partial<AjaxClientRequest> = {
      url: '/test-url'
    };
    const mockedAjaxInstance = jest.fn();
    ajaxClient.ajaxInstance = mockedAjaxInstance as any;

    mockedAjaxInstance.mockReturnValue(of(null));

    ajaxClient.request(options);

    expect(mockedAjaxInstance).toHaveBeenCalledWith({
      url: `${baseUrl}${options.url}`
    });
  });
});
