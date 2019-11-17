import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:3000/auth';
  userRoles: Array<Roles>;
  token: string;
  user: Observable<User>;

  constructor() {
    // Get user and token
    // this.user = this.getUser(
    //     switchMap(user => {
    //         if (user) {
    //             user.getIdToken().then((token: string) => { this.token = token; });
    //             return user;
    //         } else {
    //             this.token = null;
    //             return of(null); //
    //         }
    //     })
    // );
  }

  get isAuthenticated(): boolean {
    return true;
  }

  getUserInfo() { }

  login(email: string, password: string) { }
  signup(email: string, password: string) { }
  sendVerificationEmail() { }
  logOut() { }
  updatePassword(passWordInfo: any) { }
  updateUserInfo(user: User) { }
  sendResetEmail(emailReset: any) { }


  ///// Authorization Logic /////
  /// Helper to determine if any matching roles exist

  checkRoleAuthorization(allowedRoles: Roles[]): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }

  get canRead(): boolean {
    const allowed = [Roles.ADMIN, Roles.EDITOR, Roles.USER];
    return this.checkRoleAuthorization(allowed);
  }

  get canEdit(): boolean {
    const allowed = [Roles.ADMIN, Roles.EDITOR];
    return this.checkRoleAuthorization(allowed);
  }

  get canDelete(): boolean {
    const allowed = [Roles.USER];
    return this.checkRoleAuthorization(allowed);
  }

  private handleMessages(error: HttpErrorResponse) { }

}
