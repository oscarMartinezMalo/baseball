import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';
import { AuthService } from '../modules/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, subscribeOn } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public team = new Subject<User[]>();

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) {
    // Get the teamMember from the current user team.
    this.auth.user
      .pipe(take(1))
      .subscribe(async user => {
        const teamList = await this.getTeamMembers(user.team);
        this.team.next(teamList);
      });
  }

  public async getTeamMembers(currentTeam: string) {
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

