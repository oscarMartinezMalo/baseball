import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    Validators,
    FormGroup,
    ValidatorFn,
    AbstractControl,
    Validator,
    ValidationErrors
} from "@angular/forms";
import { UserPlayer } from "src/app/shared/models/user-player";
import { AuthService } from "../auth.service";
import { Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;

     ngOnInit() {
        this.profileForm = this.createPlayer();
    }

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private sharedService: SharedService
    ) {}

    createPlayer(): FormGroup {
        return this.fb.group({
            roles: ["player", Validators.required],
            team: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            age: [null, Validators.required],
            phone: [null, Validators.required]
        });
    }

    createCoach(): FormGroup {
        return this.fb.group({
            roles: ["coach", Validators.required],
            team: [null, Validators.required, CustomValidator.TeamAlreadyTakenValidator(this.sharedService)],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            phone: [null, Validators.required]
        });
    }

    createFan(): FormGroup {
        return this.fb.group({
            roles: ["fan", Validators.required],
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
            case "player":
                this.profileForm = this.createPlayer();
                break;
            case "coach":
                this.profileForm = this.createCoach();
                break;
            case "fan":
                this.profileForm = this.createFan();
                break;
        }
    }

    onSubmit() {
        console.log(this.profileForm);
        // this.profileForm.get("team").markAsTouched();
        if (this.profileForm.valid) {
            // console.log(this.profileForm.value);

            // Check if the profile is a coach
            this.authService.createUserData(this.profileForm.value);
        }
    }

}

class CustomValidator {
    static TeamAlreadyTakenValidator(sharedService: SharedService) {
        return (control: AbstractControl) => {
            return sharedService.getTeams().then(teams => {
                const newTeam = control.value;
                const teamExist = (teams as string[]).includes(newTeam);
                return teamExist
                    ? { teamAlreadyTaken: { value: control.value } }
                    : null;
            });
        };
    }
}
