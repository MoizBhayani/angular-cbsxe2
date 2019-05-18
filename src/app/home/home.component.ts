import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string = "moiz";
  amount: number = 123456;
  dateOfBirth = new Date();

  constructor() { }

  ngOnInit() {
  }

}
