import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/admin/date.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private datesService: DateService) { }

  dates = [];

  ngOnInit(): void {
    this.datesService.getAllDates().then(u => {this.dates = u, console.log(this.dates)});
  }

}
