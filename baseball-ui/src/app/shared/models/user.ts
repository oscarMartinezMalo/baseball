import { Roles } from '../enums/roles.enum';

export class User {
    uid: string;
    email: string;
    photoUrl: string;
    firstName: string;
    lastName?: string;
    roles: Roles[];
    team: string;
}
