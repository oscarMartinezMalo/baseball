import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Event } from 'src/app/shared/models/event.model';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event-view',
    templateUrl: './event-view.component.html',
    styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
    @Input() event: Event = new Event();

    @Input() lat = 25.822510744582278;
    @Input() lng = -80.33856525776369;
    @Input() mapZoom = 15;
    @Input() locationChosen = false;

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute) { }

    async ngOnInit(): Promise<void> {
        const eventId = this.route.snapshot.paramMap.get('id');
        const resultEvent = await this.eventService.getEventById(eventId);

        this.event = resultEvent as Event;
        this.locationChosen = true;
    }

}
