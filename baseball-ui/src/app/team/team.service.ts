import { Injectable } from '@angular/core';
import { Subject, Observable, of, } from 'rxjs';
import { User } from '../shared/models/user';
import { AuthService } from '../modules/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../shared/errors/app-error';
import { NotFoundError } from '../shared/errors/not-found-error';
import { promise } from 'protractor';
import { BadInput } from '../shared/errors/bad-input';

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

  async loadTeamMembers(currentTeam: string) {
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

  deleteTeamMember(id: string) {
    return of('154').
    pipe(catchError(this.handleError));
  }

  private handleError( error: Response) {
    if ( error.status === 404 ) {
      return Observable.throw( new NotFoundError());
    }

    if ( error.status === 400 ) {
      return Observable.throw( new BadInput(error.json()));
    }

    return Observable.throw(new AppError(error));
  }

}

