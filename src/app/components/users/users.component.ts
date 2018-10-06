import { Component, OnInit } from '@angular/core';
import {IUser} from '../../interfaces/user';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: [IUser];
  userToDelete: IUser;

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    this._usersService.getUsers().subscribe(data => this.users = data);
  }

  deleteUser() {
    console.log('deleting user : ' + this.userToDelete.name);
    this._usersService.deleteUser(this.userToDelete.id).subscribe(data => this.users = data);
  }



}
