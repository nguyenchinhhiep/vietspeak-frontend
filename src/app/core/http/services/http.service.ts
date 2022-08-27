import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint, ApiMethod } from '../api.model';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {}

  /**
   * Call Request
   *
   * @param options
   * @returns
   */
  request(options: {
    apiUrl: ApiEndpoint | string;
    method: ApiMethod;
    body?: any;
    params?: { [key: string]: any };
  }): Observable<any> {
    // Create http params object
    let httpParams = new HttpParams();

    // Extract the data from the options
    const { apiUrl, method, body, params } = options;

    // Add the params keys and value to the http params object
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] != null && params[key].toString().trim() !== '') {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    // Create response observable
    let response: Observable<any> | null = null;

    // Add the response observable to the corresponding http response
    switch (method) {
      case ApiMethod.Get:
        response = this._get(apiUrl, httpParams);
        break;
      case ApiMethod.Post:
        response = this._post(apiUrl, body, httpParams);
        break;
      case ApiMethod.Put:
        response = this._put(apiUrl, body, httpParams);
        break;
      case ApiMethod.Patch:
        response = this._patch(apiUrl, body, httpParams);
        break;
      case ApiMethod.Delete:
        response = this._delete(apiUrl, httpParams);
        break;
    }

    // Return the response
    return response;
  }

  /**
   * Get
   *
   * @param apiUrl
   * @param params
   * @returns
   */
  private _get(
    apiUrl: ApiEndpoint | string,
    params?: HttpParams
  ): Observable<any> {
    return this._http.get(apiUrl, {
      params: params,
    });
  }

  /**
   * Post
   *
   * @param apiUrl
   * @param body
   * @param params
   * @returns
   */
  private _post(
    apiUrl: ApiEndpoint | string,
    body: any,
    params?: HttpParams
  ): Observable<any> {
    return this._http.post(apiUrl, body, {
      params: params,
    });
  }

  /**
   * Put
   *
   * @param apiUrl
   * @param body
   * @param params
   * @returns
   */
  private _put(
    apiUrl: ApiEndpoint | string,
    body: any,
    params?: HttpParams
  ): Observable<any> {
    return this._http.put(apiUrl, body, {
      params: params,
    });
  }

  /**
   * Patch
   *
   * @param apiUrl
   * @param body
   * @param params
   * @returns
   */
  private _patch(
    apiUrl: ApiEndpoint | string,
    body: any,
    params?: HttpParams
  ): Observable<any> {
    return this._http.patch(apiUrl, body, {
      params: params,
    });
  }

  /**
   * Delete
   *
   * @param apiUrl
   * @param params
   * @returns
   */
  private _delete(
    apiUrl: ApiEndpoint | string,
    params?: HttpParams
  ): Observable<any> {
    return this._http.delete(apiUrl, {
      params: params,
    });
  }
}
