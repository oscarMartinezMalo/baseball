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
  public dataSource = [];

  constructor( private team: TeamService) { }

  ngOnInit() {
    this.team.team.
    pipe(take(1)).
    subscribe(teamMembers => {
      this.dataSource = teamMembers;
    });
  }

}
