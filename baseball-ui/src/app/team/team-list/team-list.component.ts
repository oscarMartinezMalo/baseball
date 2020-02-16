import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { User } from 'src/app/shared/models/user';
import { DataSource } from '@angular/cdk/table';
// import { take } from 'rxjs/operators';
// import { AppError } from 'src/app/shared/errors/app-error';
// import { NotFoundError } from 'src/app/shared/errors/not-found-error';
// import { trigger, transition, state, style, animate } from '@angular/animations';
import { fade } from 'src/app/shared/animations/animation';
import { MatTableDataSource } from '@angular/material';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  animations: [
    fade
    // trigger('fade', [
    //   state('void', style({opacity: 0})),
    //   transition(':enter, :leave', [
    //     style({ opacity: 0 }),
    //     animate( 300)
    //   ])
    // ])
  ]
})
export class TeamListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'phone'];
  public dataSource = new MatTableDataSource<User>();

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    // Call get the teamMembers and subscribe to the
    // teamMembersObservable to update the list.
    this.teamService.getTeamMembers();
    this.teamService.teamMembersObservable.
    pipe(take(1)).
    subscribe((teamMembersList) => {
      this.dataSource.data = teamMembersList;
    });
  }

  onDelete( rowElement) {
    const index = this.dataSource.data.indexOf(rowElement);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
}

