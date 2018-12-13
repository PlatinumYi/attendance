import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { User } from '../common/user'
import { Observable } from 'rxjs';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url ;
  private headers ;

  constructor(private http: Http, private apiService: ApiService) {
    this.api_url = apiService.getUrl() + '/api';
    this.headers = apiService.getHeaders();
  }

  login(user: User){
    this.api_url += '/login';
    const url = `${this.api_url}`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log(res)
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
