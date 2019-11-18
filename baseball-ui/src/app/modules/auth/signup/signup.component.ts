import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, this.emailValid()])],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (this.signUpForm.valid && this.signUpForm.touched) {
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
