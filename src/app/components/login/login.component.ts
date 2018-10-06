import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private _authService: UsersService) {}

  ngOnInit() {
    this._authService.isUserAuthenticated().subscribe(value => {
      if (value) {
        console.log('LoginComponent: user is authenticated');
      } else {
        console.log('LoginComponent: user is not authenticated');
      }
    });
  }

  signUser(email, password) {
    console.log(password);
    console.log(email);
    this._authService.loginUser(email, password);
  }



}
