import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class UserService {
  url: string

  constructor(private http: HttpClient) {
  }

  /** POST: add a new user to the database */
  addUser(userName: string): Observable<any> {
    return this.http.post('api/users', {
      userName: userName
    }, httpOptions)
  }

  getUser(userName: string): Observable<any> {
    return this.http.get(`api/users/${userName}`)
  }

  findOrCreate(userName: string) {
    this.getUser(userName)
      .subscribe(user => {
        if (!user) {
          this.addUser(userName).subscribe(user => {
            console.log("Created a new user")
            console.log(user)
          })
        } else {
          return user
        }
      })
  }
}
