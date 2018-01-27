import {Injectable} from '@angular/core';
import {Http, Headers, RequestMethod, Request, ResponseContentType} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';

@Injectable()
export class ApiService {

  /**
   * Add Authorization headers
   * @param method
   * @return {Headers}
   */
  private static createAuthorizationHeader(method: Method): Headers {
    let headers = new Headers();

    if (method !== 'POST') {
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    return headers;
  }

  /**
   * Format and returns method for api call
   * @param method
   * @returns {RequestMethod}
   */
  private static methodFormat(method: Method): RequestMethod {
    let formatMethod: RequestMethod;
    switch (method) {
      case 'GET':
        formatMethod = RequestMethod.Get;
        break;
      case 'POST':
        formatMethod = RequestMethod.Post;
        break;
      case 'PUT':
        formatMethod = RequestMethod.Put;
        break;
      case 'DELETE':
        formatMethod = RequestMethod.Delete;
        break;
      case 'OPTIONS':
        formatMethod = RequestMethod.Options;
        break;
      case 'HEAD':
        formatMethod = RequestMethod.Head;
        break;
      case 'PATCH':
        formatMethod = RequestMethod.Patch;
        break;
    }
    return formatMethod;
  }

  /**
   * Inject angular's http to wrap it
   * @param http
   * @param router
   */
  constructor(
    private http: Http,
    private router: Router
  ) {}

  /**
   * Check if session is stocked and forward request for api call
   * @param {Method} method
   * @param {string} url
   * @param {Object} body
   * @param {ResponseContentType} responseType
   * @return {Observable<any>}
   */
  public request(method: Method, url: string, body?: Object, responseType?: ResponseContentType): Observable<any> {
    return this.executeRequest(method, url, body, responseType);
  } // request

  /**
   * Do http request to the api and serve response
   * @param {Method} method
   * @param {string} url
   * @param body
   * @param responseType
   * @return {Observable<any>}
   */
  private executeRequest(method: Method, url: string, body?: any, responseType?: any): Observable<any> {
    // ---- Build the request ----
    let request: Request;
    if (method === 'GET') {
      request = new Request({
        method: ApiService.methodFormat(method),
        url: url,
        search: body,
        headers: ApiService.createAuthorizationHeader(method),
        withCredentials: true,
        responseType: responseType
      });
    } else {
      request = new Request({
        method: ApiService.methodFormat(method),
        url: url,
        body: body,
        headers: ApiService.createAuthorizationHeader(method),
        withCredentials: true,
        responseType: responseType
      });
    }

    // ---- First, try to make the request ----
    return this.http.request(request, {withCredentials: true})
    // ---- Stops everything if no response happen in a certain interval ----
    // .timeout(15000)
    // ---- Execute treatments on success before throwing it again ----
      .map((data) => {
        if (data.json() && data.json().response) {
          return data.json().response;
        } else if (data.json() && data.json().acknowledge) {
          return data.json().acknowledge;
        } else {
          return data;
        }
      })
      // ---- Execute treatments on error before throwing it again ----
      .catch((err) => {
        if (+err.status === 401) {
          this.router.navigateByUrl('logout');
        }
        if (err.json().acknowledge && !err.json().acknowledge.message.code) {
          return Observable.throw(err.json());
        } else {
          return Observable.throw('Error server');
        }
      });
  } // executeRequest

  public list(object:string) {
      return this.request('GET','http://localhost:8080/api/'+object);
  }
}
