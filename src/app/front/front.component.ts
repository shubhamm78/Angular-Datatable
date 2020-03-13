import { MessageService } from './../message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { USER } from './../user-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserApiService } from '../user-api.service';


@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {
  title="HTML POC BY SHUHBAM";
  
  // users=USER;
  //create datasource(users) as an instance of the mat table datasource class
  displayedColumns: string[] = ['id','profile','name','email','dob','phone','action'];
  users=new MatTableDataSource(USER);

  constructor(private userService:UserApiService) { }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
  ngOnInit(): void {
    this.getUsers();
    this.users.sort=this.sort;
    this.users.paginator=this.paginator;
  }
  getUsers():void
  {
    this.userService.getUsers()
    .subscribe(users=>(this.users.data=users));
  }
  logData(row)
  {
    console.log(row.id);
  }
  applyFilter(filterValue:string)
  {
    this.users.filter=filterValue.trim().toLowerCase();
  }
}
