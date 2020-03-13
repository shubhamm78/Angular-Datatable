import { New } from './new';
import { Location } from '@angular/common';
import { UserApiService } from './../user-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm:FormGroup;
  persons:New;
  post:any;
  profile:string;
    name:string;
    email:string;
    dob:any;
    phone:number;
    password:string;
    color:any;
    alert:string="this field is required";

  constructor(private route:ActivatedRoute,
    private userService:UserApiService,
    private location:Location,
    private fb:FormBuilder) { 
      this.addForm=fb.group({
        'profile':[null,Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(40)])],
        'name':[null,Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(50)])],
        'email':[null,Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100),Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
        'dob':[null,Validators.required],
        'phone':[null,Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(12)])],
        'password':[null,Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(70)])],
        'color':[null,Validators.required],
        'validator':[null,Validators.required],
        'check':''
      })
    }
  ngOnInit(): void {
this.showHide();

  
  }
  hide:boolean;
  msg:string;
  get passwordInput() { return this.addForm.get('password'); } 
   
  addPost(post)
  {
    this.userService.addUser(post).subscribe();

    console.log(post.profile);
    console.log(post);
  }
  showHide()
  {
    if(this.hide)
    {
      this.hide=false;
    }
    else
    {
      this.hide=true  ;
    }
  }
goBack():void{
    this.location.back();
  }

  
}
