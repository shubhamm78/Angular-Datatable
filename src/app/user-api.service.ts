import { New } from './add-user/new';
import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';
import { User } from './front/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApiService 
{
 httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private userurl="http://localhost:3000/httpMethods/get";

  constructor(
    private http:HttpClient,
    private messageService:MessageService
  ) { }

  private handleError<T>(operation='operation',result?:T)
  {
    return (error:any):Observable<T> =>
    {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T); 
    }
  }
  // Angular makes use of observables as an interface to handle a variety of common asynchronous operations.
  //  For example: You can define custom events that send observable output data from a child to a parent component. 
  // The HTTP module uses observables to handle AJAX requests and responses.
  // A pipe is a class decorated with pipe metadata. The pipe class implements the PipeTransform interface's transform method that accepts an input value followed by optional parameters and returns the transformed value.
  // There will be one additional argument to the transform method for each parameter passed to the pipe.
  // Pipes are a useful feature in Angular. They are a simple way to transform values in an Angular template.
  //  There are some built in pipes, but you can also build your own pipes. A pipe takes in a value or values and then returns a value.
  getUsers():Observable<User[]>
  {
    
    return this.http.get<User[]>(this.userurl).pipe(
      tap(_=>this.log('Fetched Users')),
      catchError(this.handleError<User[]>('getHeroes',[])),
    );
  }
  
  getUser(id:number):Observable<User>
  {
    const url=`${this.userurl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_=>console.log(`Fetched Hero Id=${id},`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    )
  }

  addUser(user:New):Observable<New>
  {
    const url=`http://localhost:3000/httpMethods/insert1`;
    return this.http.post(url,user,this.httpOptions).pipe
    (
      tap((newUser:New)=>console.log(`added user Name is=${user.name}`)),
      catchError(this.handleError<New>('addUser'))

    )
  }

 
  updateUser(user:User,id1:number):Observable<User>
  {
    
    const url1=`http://localhost:3000/httpMethods/editdata1/${id1}`;
    return this.http.put(url1,user,this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${user.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )  
  }
  
  
  private log(message: string) {
    this.messageService.add(`UserApiService: ${message}`);
  }
}
