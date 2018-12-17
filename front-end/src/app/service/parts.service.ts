import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Http, Headers } from '@angular/http';
import { ResponseData } from '../common/response-data';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  private api_url ;
  private headers ;

  constructor(private http: Http, private apiService: ApiService) {
    this.headers = apiService.getHeaders();
    this.api_url = apiService.getUrl() + '/api/parts';
  }

  getParts() : Promise<ResponseData>{
    const url = `${this.api_url}`;
    return this.http
      .get(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ResponseData)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
