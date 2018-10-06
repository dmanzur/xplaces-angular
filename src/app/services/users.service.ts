import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { IUser } from '../interfaces/user';
import { keys } from '../keys';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = keys['server'] + 'manager/';
  readonly isAuthenticated: BehaviorSubject<boolean>;
  private user: IUser;

  constructor(private http: HttpClient) {
    this.isAuthenticated = new BehaviorSubject<boolean>(false);
  }

  public isUserAuthenticated(): BehaviorSubject<boolean> {
    return this.isAuthenticated;
  }

  public loginUser(email: string, password: string) {
    console.log('loginUser');

    const address = this.baseUrl + 'login';
    this.http.post<IUser>(address, {email: email, password: password}).subscribe(loggedUser => {
      if (loggedUser) {
        this.isAuthenticated.next(true);
        this.user = loggedUser;
        console.log(this.user);
      } else {
        this.isAuthenticated.next(false);
      }
    });
  }

  public logout() {
    console.log('logout user');
    const address = this.baseUrl + 'logout';
    this.http.get<boolean>(address).subscribe(value => {
      if (value) {
        this.isAuthenticated.next(!value);
      } else {
        this.isAuthenticated.next(value);
      }
    });
  }

  public getUsers(): Observable<[IUser]> {
    console.log('getUsers');
    const address = this.baseUrl + 'users';
    return this.http.get<[IUser]>(address);
  }

  public deleteUser(userId: string): Observable<[IUser]> {
    console.log('deleteUser');
    const address = this.baseUrl + 'users/delete/' + userId;
    return this.http.get<[IUser]>(address);
  }

}
