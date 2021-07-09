import { getUrlScheme } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: DataService, private route: Router, private activeRoute: ActivatedRoute) { }

  formGroup!: FormGroup;
  urlResponse!: string;
  urldata: any;
  name: any;

  ngOnInit(): void {

    this.name = localStorage.getItem('name');
    this.formGroup = this.fb.group({
      url: ['', [Validators.required]]

    })
    this.getUrls()
  }

  getshortURL() {
    console.log(this.formGroup.value);
    let data = {
      email: localStorage.getItem('email'),
      url: this.formGroup.value.url
    }
    this.data.create_url(data).subscribe((data: any) => {
      this.urlResponse = data;
      console.log(this.urlResponse);
      this.getUrls();
    },
      (error) => {
        this.urlResponse = error.error;
        console.log(this.urlResponse);
        $("#exampleModal").modal('show');

        setTimeout(() => {
          $('#exampleModal').modal('hide');
        }, 1000);

      })

  }
  getUrls() {
    let data = {
      email: localStorage.getItem('email')
    }
    this.data.get_url(data).subscribe((data: any) => {
      this.urldata = data;
      console.log(this.urldata);

    },
      (error) => {
        console.log(error);
        
      })
  }

  logout() {
    this.route.navigate(["/login"]);
  }

  clcikcount(data: any){
    console.log(data);
    let clickdata={
      email: data.email,
      url: data.url
    }
    this.data.click_url(clickdata).subscribe((data: any) => {
      this.urlResponse = data;
      console.log(this.urlResponse);
      $("#exampleModal").modal('show');

        setTimeout(() => {
          $('#exampleModal').modal('hide');
        }, 1000);
        
      this.getUrls();
    },
      (error) => {
        this.urlResponse = error.error;
        console.log(this.urlResponse);
        $("#exampleModal").modal('show');

        setTimeout(() => {
          $('#exampleModal').modal('hide');
        }, 1000);

      })

  }
}
