import { Component, OnInit } from '@angular/core';
import { LQueries_ } from '@angular/core/src/render3/query';
import {Data} from '../../domain/data'
import { ApplyService } from '../../service/apply.service';
@Component({
  selector: 'app-mydetail',
  templateUrl: './mydetail.component.html',
  styleUrls: ['./mydetail.component.css']
})

export class MydetailComponent implements OnInit {
  paperOrTime: boolean;
  dat: Data[];

  constructor(private applyService: ApplyService ) { }
  
  ngOnInit() {
    this.paperOrTime=false;
    this.applyService.getSelfApply()
    .then( result =>{
          this.dat=result.data;
          console.log(this.dat);
      }
    )
  }
  showPaper(){
     this.paperOrTime=false;
  }
  showTime(){
    this.paperOrTime=true;
  }
}