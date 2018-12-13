import { Component, OnInit } from '@angular/core';
import { User } from '../common/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { ApiService } from '../service/api.service';
import { promise } from 'protractor';
import { from } from 'rxjs';
import { UserService } from '../service/user.service'
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private api_url ;
  private headers ;
  message: String;

  user: User;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private http: Http, private apiService: ApiService) {
    this.api_url = apiService.getUrl() + '/api/login';
    this.headers = apiService.getHeaders();
  }

  onSubmit() {
    var user = {
      work_number: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    if(user.work_number.length == 0 || user.password.length == 0){
      this.message = '用户名和密码不能为空'
      return
    }
    
     console.log(user.work_number + ' - ' + user.password)
    const url = `${this.api_url}`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json()
        console.log(res.json())
        if(result['error_code'] == 3){
          this.message = result['message']
        }
        if(result['error_code']  == 0){
          this.message = result['message']
        }
        console.log(1)
      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
}

  ngOnInit() {
  }

}
