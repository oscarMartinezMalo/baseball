import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { User } from 'src/app/shared/models/user';
import { DataSource } from '@angular/cdk/table';
import { take } from 'rxjs/operators';

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
    // Call get the teamMembers and subscribe to the teamMembersObservable to update the list.
    this.teamService.getTeamMembers();
    this.teamService.teamMembersObservable.subscribe((teamMembersList) => {
      this.dataSource = teamMembersList;
    });
  }

}

