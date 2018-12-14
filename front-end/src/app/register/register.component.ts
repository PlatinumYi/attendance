import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserRegisterService } from '../service/user-register.service';
import { PartsService } from '../service/parts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message:string
  // work_number: string

  // user: {
    work_number: string;
    password: string;
    password_confirm: string;
    real_name: string;
    gender: number;
    part_id_selected: number;
    // parts: object[]
  // }

  registerForm = new FormGroup({
    work_number: new FormControl(''),
    password: new FormControl(''),
    password_confirm: new FormControl(''),
    real_name: new FormControl(''),
    gender: new FormControl(''),
    part_id_selected: new FormControl('')
  })

  constructor(private userRegisterService : UserRegisterService, private partService : PartsService) { }

  ngOnInit() {
    // this.partService.getParts()
    //   .then(result => {
    //     console.log(result.data)
    //     this.user.parts = result.data
    //     console.log('111'+this.user.parts)
    //   })
    //   .catch(this.handleError);
  }

  onSubmit() {
    // console.log('1' + this.registerForm.value.work_number)
    this.work_number = this.registerForm.value.work_number
    this.password = this.registerForm.value.password
    this.password_confirm = this.registerForm.value.password_confirm
    this.real_name = this.registerForm.value.real_name
    this.gender = this.registerForm.value.gender
    this.part_id_selected = this.registerForm.value.part_id_selected
    console.log('111'+ this.work_number)

    // this.user.work_number = this.registerForm.value.work_number
    // this.user.password = this.registerForm.value.password
    // this.user.password_confirm = this.registerForm.value.password_confirm
    // this.user.real_name = this.registerForm.value.real_name
    // this.user.gender = this.registerForm.value.gender
    // this.user.part_id_selected = this.registerForm.value.part_id_selected

    if (this.work_number.length == 0 || this.password.length == 0 || this.password_confirm.length == 0 ||
      this.real_name.length == 0 || this.gender == null || this.part_id_selected == null){
        this.message = '请确认信息填写完整'
    }
    else if (this.work_number.length > 20 || this.work_number.length < 6){
      this.message = '工号应在6~20字符之间'
    }
    else if (this.password != this.password_confirm){
      this.message = '两次输入的密码不一致'
    }
    else{
      this.userRegisterService.register(this.work_number, this.password, this.real_name, this.gender, this.part_id_selected)
        .then(result => {
          console.log(result)
          if(result.error_code == 0){
            document.getElementById('foot').className = "footVisible"
          }
          else if(result.error_code == 2){
            this.message = result.message
          }
        })
    }

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
