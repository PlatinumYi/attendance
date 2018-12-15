import { ApplyService } from './../../service/apply.service';
import { Component, OnInit } from '@angular/core';
import {Absence} from '../../domain/absence';
import {NgModule} from '@angular/core'
import {Location} from '@angular/common'
import { ToastService } from 'src/app/service/toast.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  abs: Absence;
  applyreason: string;
  applyname: string;
  applydate: string;
  applytype: string;

  constructor(   private location: Location, private applyService : ApplyService, private toastService: ToastService, private router: Router
  ) {  }
  

  ngOnInit() {
    this.abs=new Absence();
    this.abs.type=0;
  }
  onSubmit(){
    // let work_number = window.localStorage.getItem("work_number")
    // console.log(Object.assign(this.abs, {work_number: work_number}));
    // let new_data = Object.assign(this.abs, {work_number: work_number})
    // this.abs.length = parseInt(this.abs.length, 10)
    this.applyService.addApply(JSON.stringify(this.abs))
      .then(result => {
        console.log('final '+ result.error_code)
        if (result.error_code == 0){
          // console.log(1111)
          this.toastService.showToast('请假成功', 1500)
          this.router.navigate(['/layout'])
        }else if (result.error_code == 21){
          this.toastService.showToast(result.message, 1500)
        }else if (result.error_code == 22){
          this.toastService.showToast(result.message, 1500)
        }
      })
  }
  back(){
      this.location.back();
  }

}
