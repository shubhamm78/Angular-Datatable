import { AddUserComponent } from './add-user/add-user.component';
import { FrontComponent } from './front/front.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'datatable/detail/:id',component:EditUserComponent},
  {path:'datatable',component:FrontComponent},
  {path:'addUser',component:AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
