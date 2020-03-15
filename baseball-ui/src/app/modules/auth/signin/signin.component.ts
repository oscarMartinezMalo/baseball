import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  public progressBarMode = '';
  hasUnitNumber = false;

  signForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, this.emailValid()])],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) { }

  async onSubmit() {
    if (this.signForm.valid && this.signForm.touched) {
      const email = this.signForm.get('email').value.trim();
      const password = this.signForm.get('password').value;

      this.progressBarMode = 'indeterminate';
      await this.authService.logIn({email, password});
      this.progressBarMode = '';
    }
  }

  emailValid() {
    return control => {
      // tslint:disable-next-line: max-line-length
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(control.value) ? null : { invalidEmail: true };
    };
  }
}
