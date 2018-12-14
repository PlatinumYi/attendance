import { Component, OnInit } from '@angular/core';
import {Absence} from '../../domain/absence';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  abs: Absence;

  resaon: string;
  length: number;
  start_time: string;

  addApplyForm = new FormGroup({
    reason: new FormControl(''),
    length: new FormControl(''),
    start_time: new FormControl('')
  })

  constructor() { }

  ngOnInit() {
  }

}
