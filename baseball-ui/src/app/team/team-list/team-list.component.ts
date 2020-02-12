import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { User } from 'src/app/shared/models/user';
import { DataSource } from '@angular/cdk/table';
import { take } from 'rxjs/operators';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'phone'];
  public dataSource: User[] = [];

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    // Call get the teamMembers and subscribe to the
    // teamMembersObservable to update the list.
    this.teamService.getTeamMembers();
    this.teamService.teamMembersObservable.subscribe((teamMembersList) => {
      this.dataSource = teamMembersList;
    });
  }

  deleteTeamMember() {
    this.teamService.deleteTeamMember('Juan')
      .subscribe(() => {
        // do Something with the list
      },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('This post has been already deleted.');
          } else {
            throw error;
          }
        });
  }

}

