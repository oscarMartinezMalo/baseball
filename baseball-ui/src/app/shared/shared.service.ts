import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../modules/auth/auth.service';
import { switchMap, take, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Observable, Subject } from 'rxjs';
import { User } from './models/user';

@Injectable()
export class SharedService {
    rootUrl = 'https://baseball-team.firebaseio.com/';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private afs: AngularFirestore
    ) {
        //
    }

    // Get All the teams from teams collection
    // this method is used in the team validation to verify there are no repeated teams
    async getTeams(): Promise<string[]> {
        const snapshot = await this.afs.collection('teams').ref.get();

        if (snapshot.empty) {
            console.warn('No matching documents.');
            return;
        }

        const teamList = new Array<string>();
        // Add the team to the result list
        snapshot.forEach(doc => {
            const oneTeam = doc.data().name;
            if (oneTeam && oneTeam !== '') {
                teamList.push(oneTeam);
            }
        });

        return teamList;
    }

    // Get All the teams properties from all the collection users that are not repeated
    async getTeamsPromise(): Promise<any> {
        return this.afs.collection('users').get().pipe(
            map(collection => {
                if (collection && collection.size > 0) {
                    const teamList = new Array<string>();
                    collection.docs.forEach(doc => {
                        const oneTeam = doc.data().team;
                        if (oneTeam && oneTeam !== '' && !teamList.includes(oneTeam)) {
                            teamList.push(doc.data().team);
                        }
                    });
                    return teamList;
                }
                return of(null);
            })
        ).toPromise();
    }

    // Get team players from the current user team
    async getPlayersFromCurrentTeam(): Promise<User[]> {
        const teamList: User[] = [];

        return this.authService.user$.pipe(take(1),
            map(async user => {
                const snapshot = await this.afs
                    .collection('users')
                    .ref.where('team', '==', user.team)
                    .where('roles', '==', 'player')
                    .get();

                snapshot.forEach(doc => { teamList.push(doc.data() as User); });
                return teamList;
            })).toPromise();
    }
}
