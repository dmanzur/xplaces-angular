import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {IUser} from '../../interfaces/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  users: [IUser];
   doughnutChartLabels = [];
   doughnutChartData = [];
   doughnutChartType = 'doughnut';
    doughnutChartMap: Map<string, number> = new Map<string, number>(); //fav-id and counter

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    this._usersService.getUsers().subscribe(data => {

      data.forEach(user => {
        user.favorites.forEach(fav => {
          this.doughnutChartMap.set(fav, 0);
        });
      });

      data.forEach(user => {
        user.favorites.forEach(fav => {
          let count = this.doughnutChartMap.get(fav);
          count += 1;
          this.doughnutChartMap.set(fav, count);
        });
      });

      this.doughnutChartMap.forEach((value: number, key: string) => {
        this.doughnutChartLabels.push(key);
        this.doughnutChartData.push(value);

      });
    });
  }
}
