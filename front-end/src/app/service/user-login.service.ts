import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { User } from '../common/user'
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { responseData } from '../common/response-data';


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

  login(user: User) : Promise<responseData>{
    console.log(user);
    const url = `${this.api_url}`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as responseData)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
