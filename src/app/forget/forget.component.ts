import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

declare var $: any;

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: DataService, private route: Router, private activeRoute: ActivatedRoute) { }

  formGroup!: FormGroup;
  pwdResponse!: string; 
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required]]

    })

  }

  forgetPwd(){
    console.log(this.formGroup.value)
    this.data.pwdReset(this.formGroup.value).subscribe((data: any) => {
      this.pwdResponse = data;
      console.log(this.pwdResponse);
      $("#exampleModal").modal('show');

      setTimeout( () => {
        $('#exampleModal').modal('hide');
     }, 3000);
    },
    (error) =>{
      this.pwdResponse = error.error;
      console.log(this.pwdResponse);
      $("#exampleModal").modal('show');

      setTimeout( () => {
        $('#exampleModal').modal('hide');
     }, 1000);

    })
  }

}
