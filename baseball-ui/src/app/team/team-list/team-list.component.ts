import { Component, OnInit } from "@angular/core";
import { TeamService } from "../team.service";
import { User } from "src/app/shared/models/user";
import { DataSource } from "@angular/cdk/table";
// import { take } from 'rxjs/operators';
// import { AppError } from 'src/app/shared/errors/app-error';
// import { NotFoundError } from 'src/app/shared/errors/not-found-error';
// import { trigger, transition, state, style, animate } from '@angular/animations';
import {
    fade,
    slide,
    slideOutRigth,
    bounceOutLeftAnimation,
    fadeInAnimation
} from "src/app/shared/animations/animation";
import { MatTableDataSource, transformPanel } from "@angular/material";
import { take } from "rxjs/operators";
import {
    trigger,
    style,
    animation,
    transition,
    useAnimation,
    animate,
    query,
    animateChild,
    group,
    stagger
} from "@angular/animations";

@Component({
    selector: "app-team-list",
    templateUrl: "./team-list.component.html",
    styleUrls: ["./team-list.component.scss"],
    animations: [
        trigger("todosAnimation", [
            transition(":enter", [
                group([
                    // The queries run in parallel with group function
                    query(".mat-header-cell", [
                        style({ transform: "translateY(-20px" }),
                        animate(1000)
                    ])
                    // { optional: true })
                ])
            ])
        ]),
        trigger("todoAnimation", [
            transition(":enter", [
                useAnimation(fadeInAnimation, {
                    params: {
                        duration: "500ms"
                    }
                })
            ]),
            transition(":leave", [
                // style({ backgroundColor: 'var(--warn)' }),
                animate(500),
                useAnimation(bounceOutLeftAnimation)
            ])

            // slide
            // fade
            // trigger('fade', [
            //   state('void', style({opacity: 0})),
            //   transition(':enter, :leave', [
            //     style({ opacity: 0 }),
            //     animate( 300)
            //   ])
            // ])
        ])
    ]
})
export class TeamListComponent implements OnInit {
    displayedColumns: string[] = ["firstName", "lastName", "age", "phone"];
    public dataSource = new MatTableDataSource<User>();

    constructor(private teamService: TeamService) {}

    ngOnInit() {
        // Call get the teamMembers and subscribe to the
        // teamMembersObservable to update the list.
        this.teamService.getTeamMembers();
        this.teamService.teamMembersObservable
            .pipe(take(1))
            .subscribe(teamMembersList => {
                this.dataSource.data = teamMembersList;
            });
    }

    onDelete(rowElement) {
        const index = this.dataSource.data.indexOf(rowElement);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
    }
}
