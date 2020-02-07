import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../modules/auth/auth.service';
import { switchMap, take, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Observable, Subject } from 'rxjs';

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

    async getTeamsFromUsers(): Promise<string[]> {
        const snapshot = await this.afs
            .collection('users')
            .ref.where('roles', '==', 'coach')
            .get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        const teamList = new Array<string>();
        snapshot.forEach(doc => {
            const oneTeam = doc.data().team;
            if (oneTeam && oneTeam !== '' ) {
                teamList.push(doc.data().team);
            }
        });

        return teamList;
    }

    async getTeams(): Promise<string[]> {
        const snapshot = await this.afs
            .collection('teams').ref.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        const teamList = new Array<string>();

        snapshot.forEach(doc => {
            const oneTeam = doc.data().name;
            if (oneTeam && oneTeam !== '' ) {
                teamList.push(oneTeam);
            }
        });

        return teamList;
    }

    async getTeamsPromise(): Promise<any> {
        return this.afs
            .collection('users')
            .get()
            .pipe(
                map(collection => {
                    if (collection && collection.size > 0) {
                        const teamList = new Array<string>();
                        collection.docs.forEach(doc => {
                            const oneTeam = doc.data().team;
                            if (
                                oneTeam &&
                                oneTeam !== '' &&
                                !teamList.includes(oneTeam)
                            ) {
                                teamList.push(doc.data().team);
                            }
                        });
                        return teamList;
                    }
                    return of(null);
                })
            )
            .toPromise();
    }
}
