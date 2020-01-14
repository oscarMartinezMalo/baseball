import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserPlayer } from 'src/app/shared/models/user-player';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;

    ngOnInit(): void {
        this.profileForm = this.createPlayer();
    }

    constructor(
        private fb: FormBuilder,
        private authService: AuthService) {}

    createPlayer(): FormGroup {
        return this.fb.group({
            roles: ['player', Validators.required],
            team: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            age: [null, Validators.required],
            phone: [null, Validators.required]
        });
    }

    createCoach(): FormGroup {
        return this.fb.group({
            roles: ['coach', Validators.required],
            team: [null, Validators.required],
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
    onRoleChange($event) {
        switch ($event.value) {
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
        // this.profileForm.get("team").markAsTouched();
        if (this.profileForm.valid) {
            // console.log(this.profileForm.value);

            // Check if the profile is a coach
            this.authService.createUserData(this.profileForm.value);
        }
    }
}
