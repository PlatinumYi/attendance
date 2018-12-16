import { ResponseData } from './../common/response-data';
import { Absence } from './../domain/absence';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { Apply } from '../domain/apply';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  private api_url ;
  private headers ;

  constructor(private http: Http, private apiService: ApiService) {
    this.headers = apiService.getHeaders(window.localStorage.getItem("work_number"));
    // this.headers = apiService.getHeaders();
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

  /**
   * 提交请假申请
   * @param abs 
   */
  addApply(abs: string): Promise<ResponseData> {
    console.log('fun '+ abs)
    const url = `${this.api_url}/apply`
    // console.log("head"+this.headers['Content-type'])
    return this.http
      .post(url, abs, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ResponseData)
      // .then(res => {
      //   var test = res.json()
      //   console.log( 'res '+test['error_code'])
      // })
      .catch(this.handleError)
  }

  /**
   * 这里的是已经通过，且请假时间包含当前时间的申请列表
   */
  getCurrentApply(): Promise<Apply> {
    const url = `${this.api_url}/apply/current`
    return this.http
      .get(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Apply)
      .catch(this.handleError)
  }

  /**
   * 获取自己可以审核的假期
   */
  getPowerApply(): Promise<ResponseData> {
    const url = `${this.api_url}/apply/power`
    return this.http
      .get(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ResponseData)
      .catch(this.handleError)
  }

  /**
   * 获取自己曾提交过的所有请假单
   */
  getSelfApply(): Promise<Apply> {
    const url = `${this.api_url}/apply/self`
    return this.http
      .get(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Apply)
      .catch(this.handleError)
  }

  /**
   * 同意某申请
   * @param id 
   */
  agreeApply(id: number): Promise<ResponseData> {
    const url = `${this.api_url}/agree/${id}`
    return this.http
      .post(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ResponseData)
      .catch(this.handleError)
  }

  /**
   * 拒绝某申请
   * @param id 
   */
  banApply(id: number):Promise<ResponseData>{
    const url = `${this.api_url}/ban/${id}`
    return this.http
      .post(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ResponseData)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
