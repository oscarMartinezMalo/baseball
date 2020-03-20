import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { User } from 'src/app/shared/models/user';
import { DataSource } from '@angular/cdk/table';
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
} from 'src/app/shared/animations/animation';
import { MatTableDataSource, transformPanel, MatDialog } from '@angular/material';
import { take, switchMap } from 'rxjs/operators';
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
} from '@angular/animations';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { DialogCustomComponent, DialogData } from 'src/app/shared/components/dialog-custom/dialog-custom.component';

@Component({
    selector: 'app-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.scss'],
    animations: [
        trigger('todosAnimation', [
            transition(':enter', [
                group([
                    // The queries run in parallel with group function
                    query('.mat-header-cell', [
                        style({ transform: 'translateY(-20px' }),
                        animate(1000)
                    ])
                    // { optional: true })
                ])
            ])
        ]),
        trigger('todoAnimation', [
            transition(':enter', [
                useAnimation(fadeInAnimation, {
                    params: {
                        duration: '500ms'
                    }
                })
            ]),
            transition(':leave', [
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
    displayedColumns: string[] = ['role', 'firstName', 'lastName', 'age', 'phone', 'delete'];
    public dataSource = new MatTableDataSource<User>();
    userIsCoach: boolean;

    constructor(
        private teamService: TeamService,
        public authService: AuthService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        // Call get the teamMembers and subscribe to the
        // teamMembersObservable to update the list.
        this.teamService.getTeamMembers();
        // this.teamService.teamMembersObservable
        //     .pipe(take(1))
        //     .subscribe(teamMembersList => {
        //         this.dataSource.data = teamMembersList;

        //     });

        this.authService.user$.pipe(take(1)).subscribe((user) => {
            // If current user is not a Coach do not show trash column
            if (!(user.roles.includes(Roles.COACH))) { this.displayedColumns.pop(); }

            this.teamService.teamMembersObservable.pipe(take(1))
                .subscribe(teamMembersList => {
                    // If current user is coach remove the coach row from the list
                    if ((user.roles.includes(Roles.COACH))) {
                        const coachIndex = teamMembersList.findIndex(ele => {
                            return (ele.roles.includes(Roles.COACH));
                        });
                        teamMembersList.splice(coachIndex, 1);
                    }
                    this.dataSource.data = teamMembersList;
                });
        });

        // this.authService.user$.pipe(switchMap((user) => {
        //     if (!(user.roles.includes(Roles.COACH))) { this.displayedColumns.pop(); }
        //     return user;
        // }))

    }

    async onDelete(rowElement) {
        const dialogData = new DialogData('Confirm Action', 'Are you sure you want to remove this player from this team');
        const dialogRef = this.dialog.open(DialogCustomComponent, { maxWidth: '300px', data: dialogData });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.teamService.deleteUserFromTeam(rowElement.uid);
                const index = this.dataSource.data.indexOf(rowElement);
                this.dataSource.data.splice(index, 1);
                this.dataSource._updateChangeSubscription();
            }
        });


    }
}
