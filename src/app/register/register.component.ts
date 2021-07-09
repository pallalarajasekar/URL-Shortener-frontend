import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: DataService, private route: Router) { }

  formGroup!: FormGroup;
  createUserData: any; 
  createUser!: string;

  ngOnInit(): void {

    this.formGroup = this.fb.group({

      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  createAccount(){
    console.log(this.formGroup.value)
    this.createUser = this.formGroup.value.firstname + ' ' + this.formGroup.value.lastname;
    console.log(this.createUser);
    this.data.addUser(this.formGroup.value).subscribe((data: any) => {
      this.createUserData = data;
      console.log(this.createUserData)
    },
    (error) =>{
      this.createUserData = error.error;
      console.log(this.createUserData);
    }
    )
  }
  login(){
    console.log("enter login method");
    this.createUser = this.formGroup.value.firstname + ' ' + this.formGroup.value.lastname;
    if(this.createUserData == "Check your email and activate your account"){
      console.log("login" + this.createUser);
      this.route.navigate(["/login"]);
    }
  }

}
