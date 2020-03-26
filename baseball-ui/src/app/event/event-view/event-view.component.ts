import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventTeam } from 'src/app/shared/models/event.model';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event-view',
    templateUrl: './event-view.component.html',
    styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
    @Input() event: EventTeam = new EventTeam();

    @Input() lat = 25.822510744582278;
    @Input() lng = -80.33856525776369;
    @Input() mapZoom = 15;
    @Input() locationChosen = false;

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        const eventId = this.route.snapshot.paramMap.get('id');

        // If url param does have anything don't do anything
        if (eventId) {
            this.loadCard(eventId);
        }
    }

    // Load card from id URL
    async loadCard(eventId: string): Promise<void> {
        const resultEvent = await this.eventService.getEventById(eventId);

        this.event = resultEvent as EventTeam;

        // tslint:disable-next-line:no-string-literal
        this.event.date = new Date(this.event.date['seconds'] * 1000).toString();
        this.locationChosen = this.event.locationChosen;
        this.lat = this.event.lat;
        this.lng = this.event.lng;
        this.mapZoom = this.event.mapZoom;
    }

}

