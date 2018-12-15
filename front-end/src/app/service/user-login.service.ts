import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { User } from '../common/user'
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { ResponseData } from '../common/response-data';


@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private api_url ;
  private headers ;

  constructor(private http: Http, private apiService: ApiService) {
    this.headers = apiService.getHeaders();
    this.api_url = apiService.getUrl() + '/api/login';
  }

  login(work_number:string, password:string) : Promise<ResponseData>{
    console.log(work_number)
    let user = {
      "work_number":work_number,
      "password":password
    }
    console.log(JSON.stringify(user))
    // console.log('l '+ userInfo )
    // const user = JSON.parse(userInfo)
    // console.log('ll '+ user )
    window.localStorage.removeItem("work_number")
    const url = `${this.api_url}`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ResponseData)
      // .then(res => {
      //   console.log(res.json())
      //   res.json() as responseData
      //   console.log("qqq"+responseData)
      // })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
