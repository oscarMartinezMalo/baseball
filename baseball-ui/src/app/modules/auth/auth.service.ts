import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  /// Helper to determine if any matching roles exist
  matchingRole(allowedRoles: Roles[]): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }

  ///// Authorization Logic /////
  get canRead(): boolean {
    const allowed = [Roles.ADMIN, Roles.EDITOR, Roles.USER];
    return this.matchingRole(allowed);
  }

  get canEdit(): boolean {
    const allowed = [Roles.ADMIN, Roles.EDITOR];
    return this.matchingRole(allowed);
  }

  get canDelete(): boolean {
    const allowed = [Roles.USER];
    return this.matchingRole(allowed);
  }

}
