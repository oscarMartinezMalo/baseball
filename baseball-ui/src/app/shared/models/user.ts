import { Roles } from '../enums/roles.enum';

export interface User {
    uid: string;
    email: string;
    photoUrl: string;
    displayName: string;
    roles: Roles[];
}
