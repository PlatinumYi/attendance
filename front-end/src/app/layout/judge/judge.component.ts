import { Component, OnInit } from '@angular/core';
import { ApplyService } from '../../service/apply.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {
  data: Data[];
  selectedData: Data;
  constructor(private applyService: ApplyService ) { }

  ngOnInit() {
    this.applyService.getPowerApply()
    .then(result =>{
        this.data=result.data;
        console.log(this.data);
     } )
  }
 
  onSelect(da:Data) : void{
      this.selectedData=da;
  }

  agreed(da:Data): void{
    this.applyService.agreeApply(da.id)
    .then(result =>{
      alert("批假成功");
    })
  }

  ban(da : Data):void {
    this.applyService.banApply(da.id)
    .then();
    
  }
}
