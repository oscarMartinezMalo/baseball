import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { AuthService } from '../modules/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, subscribeOn, map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) {  }

  getTeamMembers(): Observable<User[]> {
    // Get the teamMember from the current user team.
   return this.auth.user
      .pipe(take(1),
      switchMap( async user => {
       const members = await this.loadTeamMembers(user.team);
       return members;
      }));
  }

  private async loadTeamMembers(currentTeam: string) {
    const teamList: User[] = [];

    const snapshot = await this.afs
      .collection('users')
      .ref.where('team', '==', currentTeam)
      .where('roles', '==', 'player')
      .get();

    if (snapshot.empty) { return teamList; }
    snapshot.forEach(doc => { teamList.push(doc.data() as User); });
    return teamList;
  }

}

