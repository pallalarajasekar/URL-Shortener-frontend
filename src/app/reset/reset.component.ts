import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

declare var $: any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: DataService, private route: Router, private activeRoute: ActivatedRoute) { }

  formGroup!: FormGroup;
  resetResponse!: string; 
  currenttring!: string;
  currentEmail!: string;
  verfifyData!: string
  ngOnInit(): void {

    this.formGroup = this.fb.group({
      password: ['', [Validators.required]],
      conform_pwd:['', [Validators.required]]
    })

    let stringURL_data = {
      email: this.activeRoute.snapshot.params.email,
      randomString: this.activeRoute.snapshot.params.id
    }

    console.log(stringURL_data);

    this.data.verfifyString(stringURL_data).subscribe((data: any) => {
      this.verfifyData = data;
      console.log(this.verfifyData);
    },
    (error) =>{
      this.verfifyData = error.error;
      console.log(this.verfifyData);
      $("#exampleModal").modal('show');

      setTimeout( () => {
        $('#exampleModal').modal('hide');
        this.route.navigate(["/forget"]);

     }, 3000);

    })
  }

  resetPWD(){
    console.log(this.formGroup.value)
    let resetData = {
      password: this.formGroup.value.password,
      email: this.activeRoute.snapshot.params.email
    }
    this.data.resetPassword(resetData).subscribe((data: any) => {
      this.verfifyData = data;
      console.log(this.verfifyData);
      $("#exampleModal").modal('show');

      setTimeout( () => {
        $('#exampleModal').modal('hide');
        this.route.navigate(["/login"]);

     }, 2000);
    },
    (error) =>{
      this.verfifyData = error.error;
      console.log(this.verfifyData);
    })

  }

}
