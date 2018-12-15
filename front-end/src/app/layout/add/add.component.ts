import { ApplyService } from './../../service/apply.service';
import { Component, OnInit } from '@angular/core';
import {Absence} from '../../domain/absence';
import {NgModule} from '@angular/core'
import {Location} from '@angular/common'
import { ToastService } from 'src/app/service/toast.service';
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

  constructor(   private location: Location, private applyService : ApplyService, private toastService: ToastService
  ) {  }
  

  ngOnInit() {
    this.abs=new Absence();
    this.abs.type=0;
  }
  onSubmit(){
    console.log(this.abs)
    // this.abs.length = parseInt(this.abs.length, 10)
    this.applyService.addApply(this.abs)
      .then(result => {
        console.log('final '+ result)
        if (result.error_code == 0){

        }else if (result.error_code == 21){
          this.toastService.showToast(result.message, 1500)
        }
      })
  }
  back(){
      this.location.back();
  }

}
