import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DialogData, DialogCustomComponent } from 'src/app/shared/components/dialog-custom/dialog-custom.component';
import { EventTeam } from 'src/app/shared/models/event.model';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { useAnimation, animate, transition, trigger, query, style, group, stagger, keyframes } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from 'src/app/shared/animations/animation';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
    animations: [
        trigger('todoAnimation', [
            transition(':enter', [
                query('td', [
                    style({ opacity: 0, transform: 'translateY(20px)' }), animate(500)
                ])
            ]),
            transition(':leave', [
                animate(500),
                useAnimation(bounceOutLeftAnimation)
            ])
        ])
    ]
})
export class EventListComponent implements OnInit {
    displayedColumns: string[] = ['title', 'date', 'time', 'locationUrl', 'delete'];
    dataSource = new MatTableDataSource<EventTeam>();
    isCoach = false;

    constructor(
        private authService: AuthService,
        private eventService: EventService,
        private router: Router,
        private dialog: MatDialog) { }

    ngOnInit(): void {
        this.authService.user$.pipe(take(1)).subscribe((user) => {
            // If current user is not a Coach do not show trash column
            (!(user.roles.includes(Roles.COACH))) ? this.displayedColumns.pop() : this.isCoach = true;
        });

        this.eventService.getAllEventCurrentTeam();
        this.eventService.subjectEvents.
            subscribe(events => {
                this.dataSource = new MatTableDataSource(events);
            });
    }

    applyFilter(event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    onRowClick(row) {
        this.router.navigate(['event-view', row.id]);
        console.log('2');
    }

    onClickMap($event, locationUrl) {
        $event.stopPropagation();
        window.open(locationUrl, '_blank');
    }

    async onDelete($event, rowElement) {
        $event.stopPropagation();
        const dialogData = new DialogData('Confirm Action', 'Are you sure you want to remove this event');
        const dialogRef = this.dialog.open(DialogCustomComponent, { maxWidth: '300px', data: dialogData });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.eventService.deleteEvent(rowElement.id);
                // const index = this.dataSource.data.indexOf(rowElement);
                // this.dataSource.data.splice(index, 1);
                // this.dataSource._updateChangeSubscription();
            }
        });
    }
}
