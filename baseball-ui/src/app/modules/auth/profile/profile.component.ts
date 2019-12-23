import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    profileForm = this.fb.group({
        role: ['player', Validators.required],
        team: [null, Validators.required],
        firstName: ['Oscar', Validators.required],
        lastName: [null, Validators.required],
        age: [null, Validators.required],
        phone: [null, Validators.required]
    });

    constructor(private fb: FormBuilder) {}

    onSubmit() {
        console.log(this.profileForm.value);
    }
}
