import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { ResponseData } from '../common/response-data';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  private api_url ;
  private headers ;

  constructor(private http: Http, private apiService: ApiService) {
    this.headers = apiService.getHeaders();
    this.api_url = apiService.getUrl() + '/api/register';
  }

  register(work_number: string,
    password: string,
    real_name: string,
    gender: number,
    part_id_selected: number) : Promise<ResponseData>{
    let user = {
      work_number: work_number,
      password: password,
      name: real_name,
      gender: gender,
      part: part_id_selected
    }
    const url = `${this.api_url}`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ResponseData)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
