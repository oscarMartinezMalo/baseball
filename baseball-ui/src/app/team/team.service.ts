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

  private teamMembersList: User[] = [];
  private teamMembersSubject = new Subject<User[]>();
  teamMembersObservable: Observable<User[]>;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) {
    this.teamMembersObservable = this.teamMembersSubject as Observable<User[]>;
  }

  getTeamMembers() {
    // Get the teamMember from the current user team.
    return this.auth.user
      .pipe(take(1)).
      subscribe(async user => {
        this.teamMembersList = await this.loadTeamMembers(user.team);
        this.teamMembersSubject.next(this.teamMembersList);
      });
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

