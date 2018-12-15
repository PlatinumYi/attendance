import { Absence } from './../domain/absence';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { ResponseData } from '../common/response-data';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  private api_url ;
  private headers ;

  constructor(private http: Http, private apiService: ApiService) { 
    this.headers = apiService.getHeaders();
    this.api_url = apiService.getUrl() + '/api';
  }

  // // 提交请假申请
  // addApply(abs: Absence): Promise<ResponseData> {
  //   console.log('fun '+ abs)
  //   const url = `${this.api_url}/apply`
  //   return this.http
  //     .post(url, abs, {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json() as ResponseData)
  //     .catch(this.handleError)
  // }

  // 提交请假申请
  addApply(abs: Absence): Promise<ResponseData> {
    console.log('fun '+ abs.reason);
    const url = `${this.api_url}/apply`;
    return this.http
      .post(url, JSON.stringify(abs), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ResponseData)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
