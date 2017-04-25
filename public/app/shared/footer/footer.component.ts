import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector:    'g-footer',
  templateUrl: './footer.view.html',
  styleUrls: ['./footer.styles.css'],
  providers:  [  ]
})
export class FooterComponent implements OnInit {
  currentDate = new Date();
  dateFormat: string;

  constructor() {
    this.dateFormat = this.currentDate.getMonth + ' ' + this.currentDate.getFullYear;
  }
  ngOnInit() {}
}
