import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    Validators,
    FormGroup,
    ValidatorFn,
    AbstractControl,
    Validator,
    ValidationErrors
} from '@angular/forms';
import { UserPlayer } from 'src/app/shared/models/user-player';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private sharedService: SharedService,
        private router: Router
    ) { }

    ngOnInit() {
        this.profileForm = this.createPlayer();  // Create a default player profile

        this.authService.user$.pipe(take(1)).subscribe(user => {
            // Disable Role if has already a role
            if (user.roles.length !== 0) { this.profileForm.get('roles').disable(); }

            this.onRoleChange(user.roles);  // Load current profile

            // Disable Role field and team if is a coach
            if (user.roles.includes(Roles.COACH)) { this.profileForm.get('team').disable(); }

            // Load the data from current user profile and change the form automatically
            const properties = Object.getOwnPropertyNames(user);
            properties.forEach(prop => {
                this.profileForm.controls[prop]?.setValue(user[prop]);
                // this.profileForm.controls[prop]?.disable(); // This disable all fields
            });

        });
    }

    createPlayer(): FormGroup {
        return this.fb.group({
            roles: ['player', Validators.required],
            team: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            age: [null, [Validators.required, Validators.pattern('^([1-9][0-9]?|)$')]],
            phone: [null, Validators.required]
        });
    }

    createCoach(): FormGroup {
        return this.fb.group({
            roles: ['coach', Validators.required],
            team: [null, Validators.required, CustomValidator.TeamAlreadyTakenValidator(this.sharedService)],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            phone: [null, Validators.required]
        });
    }

    createFan(): FormGroup {
        return this.fb.group({
            roles: ['fan', Validators.required],
            team: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            phone: [null, Validators.required],
            fanOf: [null, Validators.required]
        });
    }

    // Dropdown Role change
    onRoleChange(value) {
        switch (value) {
            case 'player':
                this.profileForm = this.createPlayer();
                break;
            case 'coach':
                this.profileForm = this.createCoach();
                break;
            case 'fan':
                this.profileForm = this.createFan();
                break;
        }
    }

    onSubmit() {
        if (this.profileForm.valid) {
            // Check if the profile is a coach
            this.authService.createUserData(this.profileForm.value);
            this.router.navigate(['/team-list']);
        }
    }
}


class CustomValidator {
    static TeamAlreadyTakenValidator(sharedService: SharedService) {
        return (control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> => {
            return sharedService.getTeams().then(teams => {
                const newTeam = control.value.trim().replace(/\s+/g, ' '); // Remove extra espaces from the string
                if (teams) {
                    const teamExist = (teams as string[]).includes(newTeam);
                    return teamExist
                        ? { teamAlreadyTaken: { value: control.value } }
                        : null;
                }

            });
        };
    }
}
