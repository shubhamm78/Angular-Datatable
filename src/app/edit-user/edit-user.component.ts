import { UserApiService } from './../user-api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../front/user';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  users:User;

  constructor(private route:ActivatedRoute,
    private userService:UserApiService,
    private location:Location) { }

  ngOnInit(): void
  {
    this.getUser();
   }
  getUser():void
  {
    const id=+this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
    .subscribe(
      data=>
      {
        this.users=data;
      }
     );
  }
  
  updateUser():void
  {
    const id1=+this.route.snapshot.paramMap.get('id');
    this.userService.updateUser(this.users,id1).subscribe(()=>this.goBack());
  }

  goBack():void{
    this.location.back();
  }
  

}
