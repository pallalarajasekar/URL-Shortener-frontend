import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../data.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: DataService, private route: Router) { }
  formGroup!: FormGroup;
  loginResponse!: string; 
  login_data: any; 
  ngOnInit(): void {

    this.formGroup = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  loginAccount(){
    console.log(this.formGroup.value)
    this.data.loginUser(this.formGroup.value).subscribe((data: any) => {
      this.login_data = data.checkUser;
      console.log(this.login_data.firstname);
      let fullname = this.login_data.firstname + ' ' + this.login_data.lastname;
      localStorage.setItem('name', fullname);
      localStorage.setItem('email', this.login_data.email);
      this.route.navigate(["/dashboard"]);
    },
    (error) =>{
      this.loginResponse = error.error.msg;
      console.log(this.loginResponse);
      $("#exampleModal").modal('show');

      setTimeout( () => {
        $('#exampleModal').modal('hide');
     }, 2000);

    }
    )
  }

  login(){

  }
}
