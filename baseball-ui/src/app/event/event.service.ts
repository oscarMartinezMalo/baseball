import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../modules/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    events: Event[] = [];
    public subjectEvents = new Subject<Event[]>();

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private afs: AngularFirestore
    ) { }

    async addEvent(newEvent: Event): Promise<boolean> {
        try {
            this.authService.user$.pipe(take(1)).subscribe(async user => {
                newEvent['team'] = user.team; // Add the to the event
                const eventAdded = await this.afs.collection('events').add(newEvent);

                newEvent['id'] = eventAdded.id; // get the id from the response an added to the list
                this.events.push(newEvent);
                this.subjectEvents.next(this.events);
            });
        } catch (error) {
            console.log(error);
            return false;
        }

        return true;
    }

    // deleteEvent(id: string) { }
    async getAllEventCurrentTeam() {

        this.authService.user$.pipe(take(1)).subscribe(async user => {
            const events = await this.afs
                .collection('events')
                .ref
                .where('team', '==', user.team)
                .get();

            if (events.empty) { return; }

            const eventList: Event[] = [];

            events.forEach(doc => {
                const event = doc.data();
                event.id = doc.id;
                eventList.push(event as Event);
            });

            this.events = eventList;
            this.subjectEvents.next(this.events);
        });
    }

    async getEventById(id: string) {
        const event = await this.afs
            .collection('events').doc(id)
            .ref
            .get();

        return event.data();
    }
}


