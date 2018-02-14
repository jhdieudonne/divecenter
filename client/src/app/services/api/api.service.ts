import {Injectable} from '@angular/core';
import {Http, Headers, RequestMethod, Request, ResponseContentType} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

type Method = 'get' | 'post' | 'put' | 'delete' | 'options' | 'head' | 'patch';

@Injectable()
export class ApiService {

  /**
   * Inject angular's http to wrap it
   * @param http
   * @param router
   */
  constructor(
    private http: HttpClient,
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
    // ---- First, try to make the request ----
    return this.http[method.toString()](url,body)
    // ---- Stops everything if no response happen in a certain interval ----
    // .timeout(15000)
    // ---- Execute treatments on success before throwing it again ----
      .map((data) => {
        return data;
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
    return this.request('get','http://localhost:8090/api/'+object);
  }

  public create(object:string, body: any) {
    return this.request('post','http://localhost:8080/api/'+object, body);
  }

  public delete(object: string, id: number) {
    return this.request('delete','http://localhost:8080/api/'+object+'/'+id);
  }
}
