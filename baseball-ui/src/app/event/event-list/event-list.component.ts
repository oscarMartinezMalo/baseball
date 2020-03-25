import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
    displayedColumns: string[] = ['title', 'date', 'time', 'locationUrl'];
    dataSource = new MatTableDataSource<Event>();

    constructor(
        private eventService: EventService,
        private router: Router) { }

    ngOnInit(): void {
        this.eventService.getAllEventCurrentTeam();
        this.eventService.subjectEvents.subscribe(events => {
            this.dataSource = new MatTableDataSource(events);
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    onRowClick(row) {
        console.log(row);
        this.router.navigate(['event-view', row.id]);
    }
}
