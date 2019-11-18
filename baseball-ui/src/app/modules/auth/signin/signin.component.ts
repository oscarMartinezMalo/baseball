import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, this.emailValid()])],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (this.signForm.valid && this.signForm.touched) {
      alert('Thanks!');
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
