import { Component, OnInit } from '@angular/core';
import {Absence} from '../../domain/absence';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  abs: Absence;
  constructor() { }

  ngOnInit() {
  }

}
