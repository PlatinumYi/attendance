import { Component, OnInit } from '@angular/core';
import {Absence} from '../../domain/absence';
import {NgModule} from '@angular/core'
import {Location} from '@angular/common'
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

  constructor(   private location: Location
  ) {  }
  

  ngOnInit() {
    this.abs=new Absence();
    this.abs.type=0;
  }
  onSubmit(){
    console.log(this.abs);
  }
  back(){
      this.location.back();
  }

}
