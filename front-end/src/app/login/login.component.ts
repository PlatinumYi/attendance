import { Component, OnInit } from '@angular/core';
import { User } from '../common/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { ApiService } from '../service/api.service';
import { promise } from 'protractor';
import { from } from 'rxjs';
import { UserLoginService } from '../service/user-login.service'
import { UserStatusService } from '../service/user-status.service';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/toPromise';
import { responseData } from '../common/response-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private api_url ;
  private headers ;
  message: String;
  route: String;

 res:responseData;

  user: User;
  work_number: string;
  password: string;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private userService: UserLoginService, private userStatusService: UserStatusService, private router: Router) {
  }
 
  onSubmit() {
    this.user = {
      work_number: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.work_number= this.loginForm.value.username,
    this.password=this.loginForm.value.password
    // localStorage.setItem('user', this.user);
    if(this.user.work_number.length == 0 || this.user.password.length == 0){
      this.message = '用户名和密码不能为空'
      return;
    }
    
    console.log(this.user.work_number + ' - ' + this.user.password)

    this.userService.login(this.work_number, this.password)
      .then(result => {
        // console.log('ww'+result)
        if(result['error_code'] == 3){
          this.message = result['message']
        }
        else if(result['error_code']  == 0){
          this.message = result['message']
          this.router.navigate(['/layout'])
          this.showToast("登陆成功", 3000)
        }
        return result;
      })
      .catch(this.handleError);
    
    // const url = `${this.api_url}`;
    // return this.http
    //   .post(url, JSON.stringify(user), {headers: this.headers})
    //   .toPromise()
    //   .then(res => {
    //     let result = res.json()
    //     console.log(res.json())
    //     if(result['error_code'] == 3){
    //       this.message = result['message']
    //     }
    //     if(result['error_code']  == 0){
    //       this.message = result['message']
    //     }
    //     console.log(1)
    //   })
    //   .catch(this.handleError);

  }

  showToast(msg,duration){  
    duration=isNaN(duration)?3000:duration;  
    var m = document.createElement('div');  
    m.innerHTML = msg;  
    m.style.cssText="width:60%; min-width:180px; background:#000; opacity:0.6; height:auto;min-height: 30px; color:#fff; line-height:30px; text-align:center; border-radius:4px; position:fixed; top:60%; left:20%; z-index:999999;";  
    document.body.appendChild(m);  
    setTimeout(function() {  
        var d = 0.5;  
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';  
        m.style.opacity = '0';  
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);  
    }, duration);  
}  

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
}

  ngOnInit() {
    this.user=new User();
    this.user.work_number='';
    this.user.password='';
    this.userStatusService.getUserStatus()
      .then(result => {
        console.log(result['error_code'])
      })
      .catch(this.handleError);
  }

}
