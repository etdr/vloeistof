import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // signupForm: FormGroup;

  constructor(

    // private formBuilder: FormBuilder

  ) { }

  ngOnInit() {

    // this.signupForm = this.formBuilder.group({

      // username: ['', Validators.required],
      // email: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(6) ]]

    // })

  }

}
