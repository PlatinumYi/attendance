import { Component, OnInit } from '@angular/core';
import {Apply} from '../../domain/apply';
import { ApplyService} from '../../service/apply.service';
import {Data}  from '../../domain/data';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dat: Data[];
  apply: Apply;
  constructor(private applyService: ApplyService) { }

  ngOnInit() {
    this.applyService.getCurrentApply()
    .then(result =>{
        this.apply=result;
        this.dat=this.apply.data;
        console.log(this.apply);
    })

  }

}
