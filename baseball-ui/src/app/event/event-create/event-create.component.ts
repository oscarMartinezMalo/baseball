import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../modules/auth/auth.service';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { EventTeam } from 'src/app/shared/models/event.model';

@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html',
    styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
    eventForm: FormGroup;
    lat = 25.822510744582278;
    lng = -80.33856525776369;
    mapZoom = 15;
    locationChosen = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private eventService: EventService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.eventForm = this.fb.group({
            title: [null, Validators.required],
            subtitle: [null],
            date: [null, Validators.required],
            time: ['6:00 pm', [Validators.required, Validators.pattern(/^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/)]],
            comment: [null],
            locationUrl: [null]
        });
    }

    mapChoseLocation(event) {
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
        this.locationChosen = true;
    }

    onChanges(zoom) {
        this.mapZoom = zoom;
    }

    async onSubmit() {
        if (this.eventForm.invalid) { return; }

        let eventObj: EventTeam;
        eventObj = {
            ...this.eventForm.value,
            lat: this.lat,
            lng: this.lng,
            mapZoom: this.mapZoom,
            locationChosen: this.locationChosen
        };

        if (await this.eventService.addEvent(eventObj)) {
            this.router.navigate(['/event-list']);
        }

    }
}
