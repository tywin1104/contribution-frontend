import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { Repo } from '../_modal/repo'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class UserService {
  base_url = "http://35.237.253.28"

  constructor(private http: HttpClient) {
  }

  /** POST: add a new user to the database */
  addUser(userName: string): Observable<any> {
    return this.http.post(`${this.base_url}/users`, {
      userName: userName
    }, httpOptions)
  }

  getUser(userName: string): Observable<any> {
    return this.http.get(`${this.base_url}/users/${userName}`)
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

  getFavRepos(userName: string): Observable<any> {
    return this.http.get(`${this.base_url}/users/${userName}/favrepos`)
  }

  addFavRepo(userName: string, newRepo: Repo): Observable<any> {
    return this.http.post(`${this.base_url}/users/${userName}/favrepos`, {
      repo_id: newRepo.repo_id,
      name: newRepo.name,
      url: newRepo.url
    }, httpOptions)
  }

  deleteFavRepo(userName: string, repoName: string): Observable<any> {
    return this.http.delete(`${this.base_url}/users/${userName}/favrepos/${repoName}`)
  }

  getGithubAuthToken(userName: string): Observable<any> {
    return this.http.get(`${this.base_url}/githubUserToken/${userName}`)
  }
}
