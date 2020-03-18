import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Roles } from 'src/app/shared/enums/roles.enum';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    BASE_URL = 'http://localhost:4000/auth';
    userRoles: Array<Roles>;
    token: string;
    user$: Observable<User> = of(null);

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user && user.emailVerified) {
                    user.getIdToken().then((token: string) => {
                        this.token = token;
                    });
                    return this.afs
                        .doc<User>(`users/${user.uid}`)
                        .valueChanges();
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
    updateUserData(user: firebase.User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(
            `users/${user.uid}`
        );

        const data: User = {
            uid: user.uid,
            email: user.email,
            photoUrl: user.photoURL,
            firstName: user.displayName,
            roles: [],
            team: ''
        };
        return userRef.set(data);
    }

    createUserData(userProfile: User) {
        const user = this.afAuth.auth.currentUser;
        const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(
            `users/${user.uid}`
        );

        userRef.update(userProfile).then(() => {
            this.createNewTeam(userProfile);
        });
        // userRef.set(userProfile).then(() => {
        //     this.createNewTeam(userProfile);
        // });
    }

    private async createNewTeam(teamMember: User) {
        const teamName = teamMember.team;
        if (teamMember.roles.includes(Roles.COACH)) {
            const teamSameName = await this.afs
                .collection('teams')
                .ref.where('name', '==', teamName)
                .get();

            // Only add a new team if is a new Team;
            if (teamSameName.docs.length === 0) {
                this.afs.collection('teams').add({ name: teamMember.team });
            }
        }
    }

    async logIn({ email, password }: { email: string; password: string }) {
        // Get the url that the user wanted, but couldn't go because it have to login first
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/team-list';

        try {
            const credential = await this.afAuth.auth.signInWithEmailAndPassword(
                email,
                password
            );

            if (credential.user.emailVerified) {
                // Email verification
                this.user$.pipe(take(1)).subscribe(userData => {
                    // If User does have a role go to page to complete user information.
                    userData.roles.length
                        ? this.router.navigate([returnUrl])
                        : this.router.navigate(['/profile']);
                });
            } else {
                this.snackBar.open(
                    'Please validate your email address. Check your inbox',
                    'X',
                    {
                        duration: 3000
                    }
                );
            }
        } catch (error) {
            this.snackBar.open(error.message, error.code, { duration: 3000 });
        }
    }

    async signup({ email, password }: { email: string; password: string }) {
        try {
            const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await this.updateUserData(credential.user); // Add User to the Database

            this.sendVerificationEmail(); // Verfication email
            this.logOut();
        } catch (error) {
            this.snackBar.open(error.message, error.code, { duration: 3000 });
        }
    }

    sendVerificationEmail() {
        const user = this.afAuth.auth.currentUser;
        user.sendEmailVerification()
            .then(() => {
                this.snackBar.open(
                    'Email was sent to you, please confirm account and after that you can login',
                    'X'
                );
                this.router.navigate(['/signin']);
            })
            .catch(error => {
                this.snackBar.open(error.message, 'X', { duration: 3000 });
            });
    }

    logOut() {
        this.afAuth.auth
            .signOut()
            .then(() => {
                this.token = null;
                this.router.navigate(['/signin']);
            })
            .catch(error => {
                this.snackBar.open(error.message, error.code, {
                    duration: 3000
                });
            });
    }

    updatePassword(passWordInfo: any) {
        this.afAuth.auth
            .sendPasswordResetEmail(passWordInfo)
            .then(() => {
                this.snackBar.open('An email was sent to you', 'X', {
                    duration: 3000
                });
                this.router.navigate(['/signin']);
            })
            .catch(error => {
                this.snackBar.open(error.message, 'X', { duration: 3000 });
            });
    }
    updateUserInfo(user: User) { }
    sendResetEmail(emailReset: any) {
    }


    ///// Authorization Logic /////
    /// Helper to determine if any matching roles exist

    checkRoleAuthorization(allowedRoles: Roles[]): boolean {
        return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
    }

    get canRead(): boolean {
        const allowed = [Roles.ADMIN, Roles.PLAYER, Roles.COACH];
        return this.checkRoleAuthorization(allowed);
    }

    get canEdit(): boolean {
        const allowed = [Roles.ADMIN, Roles.COACH];
        return this.checkRoleAuthorization(allowed);
    }

    get canDelete(): boolean {
        const allowed = [Roles.PLAYER];
        return this.checkRoleAuthorization(allowed);
    }

    private handleMessages(error: HttpErrorResponse) { }
}
