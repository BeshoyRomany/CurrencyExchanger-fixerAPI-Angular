import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URL = environment.apiUrl.endsWith('/')
  ? environment.apiUrl
  : environment.apiUrl + '/';
const API_KEY = environment.apikey;

export interface IHttpOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiBaseClientService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: IHttpOptions): Observable<T> {
    url = API_URL + url;
    return this.http.get<T>(url, this.parseOptions(options));
  }

  private parseOptions(options?: IHttpOptions): IHttpOptions {
    let parsedOptions = Object.assign({}, options);
    const authHeader = {
      apikey: API_KEY,
    };
    if (parsedOptions) {
      parsedOptions.headers =
        parsedOptions.headers != null
          ? parsedOptions.headers.append(
              'apikey',
              authHeader['apikey']
            )
          : new HttpHeaders(authHeader);
    } else {
      parsedOptions = {
        headers: new HttpHeaders(authHeader),
      };
    }

    parsedOptions?.headers?.append('acce', 'application/json; charset=utf-8');
    return parsedOptions;
  }

  getApiUrl(): string {
    return API_URL;
  }
}
