import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms'

import { AuthService } from '../auth.service'
import { error } from 'util';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;

  message: string = "";
  userError: any;

  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
        validator: this.checkIfMatchingPassword("password", "confirmPassword")
      })
  }

  ngOnInit() {
  }

  onSubmit(signupform) {
    let email: string = signupform.value.email;
    let password: string = signupform.value.password;
    let firstName: string = signupform.value.firstName;
    let lastName: string = signupform.value.lastName;

    this.authService.signup(email, password, firstName, lastName).then((user:any) => {

      firebase.firestore().collection("users").doc(user.uid).set({
        firstName: signupform.value.firstName,
        lastName: signupform.value.lastName,
        email: signupform.value.email,
        photoURL: user.photoURL,
        interests: "",
        bio: "",
        hobbies: ""
      }).then(()=>{
        this.message = "You have been signed up successfully. Please Login.";
      })
    }
    ).catch((error) => {
      console.log(error);
      this.userError = error;
    })
  }

  checkIfMatchingPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value == confirmPassword.value) {
        return;
      }
      else {
        confirmPassword.setErrors({
          notEqualToPassword: true
        })
      }
    }
  }

}
