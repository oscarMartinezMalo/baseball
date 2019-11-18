import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Roles } from 'src/app/shared/enums/roles.enum';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';

import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:3000/auth';
  userRoles: Array<Roles>;
  token: string;
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          user.getIdToken().then((token: string) => { this.token = token; });
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          this.token = null;
          return of(null);
        }
      })
    );
  }

  get isAuthenticated(): boolean {
    return true;
  }

  getUserInfo() { }
  // Update data from Google and emailPass SignIN and SignUP
  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      photoUrl: user.photoURL,
      displayName: user.displayName,
      roles: user.roles
    };
    return userRef.set(data);
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        // Email verification
        if (credential.user.emailVerified) {
          this.router.navigate(['/expense']);
          // this.displayMessaggeSnackBar('You just logged in', 'X');
          this.updateUserData(credential.user);
        } else {
          this.snackBar.open('Please validate your email address. Check your inbox', 'X');
        }
      }
      ).catch(
        error => {
          this.snackBar.open(error.message, error.code);
        }
      );
  }
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
