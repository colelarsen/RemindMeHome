import { Injectable } from '@angular/core';
import { User } from './models/User';
import { HttpClient, HttpParams } from '../../node_modules/@angular/common/http';
import { isNull } from '../../node_modules/@angular/compiler/src/output/output_ast';
import { Router } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }

  private getCurWeb(): string {
    const publicWeb = "http://remindmehome.com/users/";
    const localWeb = "http://localhost:3050/";
    return localWeb;
    // return publicWeb;
  }

  private user: User;

  public getUser() {
    if (this.user == undefined) {
      var localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser != undefined) {
        this.user = { ...localUser };
      }
      else {
        this.user = new User(undefined, undefined, undefined, undefined, undefined, undefined);
      }
    }

    return this.user;
  }

  public isLoggedIn(): boolean {
    return this.getUser().authKey != undefined;
  }

  public setUser(user: User) {
    this.user.authKey = user.authKey;
    this.user.passwordEncrypted = user.passwordEncrypted;
    this.user.reminderUserId = user.reminderUserId;
    this.user.reminderUsername = user.reminderUsername;
    this.user.username = user.username;
  }

  public login(user: User) {
    return this.http.post<User>(this.getCurWeb() + "login/", user);
  }

  public logout(user: User) {
    return this.http.post<User>(this.getCurWeb() + "logout/", user);
  }

  public validateAuth(user: User) {
    this.http.get<User>(this.getCurWeb() + "auth/?username=" + user.username + "&authKey="+user.authKey).subscribe(
      retUser => {
        this.setUser(retUser);
      },
      err => {
        console.log(err);
        this.setUser(new User(undefined, undefined, undefined, undefined, undefined, undefined));
        this.router.navigateByUrl("/home");
      }
    );
  }

  public createAccount(user: User) {
    return this.http.post<User>(this.getCurWeb() + "create-account/", user);
  }
}
