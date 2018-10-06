import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   isUserAuthenticated: boolean;

  constructor(private _authService: UsersService) {}

  ngOnInit() {
  this._authService.isUserAuthenticated().subscribe(value => {
    this.isUserAuthenticated = value;
    if (value) {
      console.log('AppComponent: user is authenticated');
    } else {
      console.log('AppComponent: user is not authenticated');
    }
    });
  }


}
