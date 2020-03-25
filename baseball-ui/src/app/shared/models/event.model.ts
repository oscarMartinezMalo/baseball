export class Event {
    id: string;
    title: string;
    subtitle?: string;
    date: string;
    time: string;
    comment?: string;
    locationUrl?: string;
    lat: number;
    lng: number;
    mapZoom: number;
    team: string;
}
