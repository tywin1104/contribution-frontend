import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { NzModalService } from 'ng-zorro-antd';
import { AuthService } from '../../../landing-page/auth.service'
import { UserService } from '../../../_services/user.service'
import { Repo } from '../../../_modal/repo'


@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {
  @Input() profile;
  @Input() favoriteRepos;
  @Output() favRepoAdded = new EventEmitter<Repo>();
  current_cursor = null;
  results = [];
  repo_query = gql`
  query SearchRepos($queryString: String! , $cursor_val: String) {
    search(query: $queryString, type: REPOSITORY, after: $cursor_val, first: 12) {
     repositoryCount
     edges {
       cursor
       node {
         ... on Repository {
           id
           name
           description
           url
           issues(states:OPEN){
             totalCount
           }
           languages(first:3) {
             edges {
               node {
                 name
               }
             }
           }
         }
       }
     }
   }
 }
  `
  constructor(
    private apollo: Apollo,
    private modalService: NzModalService,
    public auth: AuthService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.append_repos();
  }

  // When we got data on a success
  onSuccess(res) {
    // console.log(res);
    if (res != undefined) {
      res.forEach(item => {
        this.results.push(item);
      });
      this.current_cursor = this.results[this.results.length - 1].cursor;
      console.log(`Current cursor is ${this.current_cursor}`);
    }
  }
  // When scroll down the screen
  onScroll() {
    // console.log("Scrolled");
    this.append_repos();
  }

  append_repos() {
    try {
      let cachedResponse = this.apollo.getClient().readQuery({
        query: this.repo_query
      });
      // console.log("Found in Apollo cache!")
      // console.log(cachedResponse)
    } catch (e) {
      // console.log("Could not get from cache. Make request..")
      this.apollo.watchQuery<any>({
        query: this.repo_query,
        variables: {
          errorPolicy: 'all',
          queryString: "good-first-issues:>10  stars:>20 pushed:>2018-09-01  is:public archived:false",
          cursor_val: this.current_cursor
        }
      })
        .valueChanges
        .pipe(
          map(result => result.data.search.edges)
        ).subscribe((result: any) => {
          this.onSuccess(result);
        })
    }
  }
  tryToAddFav(repo_id, name, url) {
    if (this.auth.isAuthenticated()) {
      this.success();
      let newRepo = { repo_id, name, url } as Repo
      this.favRepoAdded.emit(newRepo)
      console.log('Emitted a new fav repo!')
      this.userService.addFavRepo(this.profile.sub, newRepo)
        .subscribe(res => {
          console.log(res)
        })
    } else {
      this.error();
    }
  }

  error(): void {
    const modal = this.modalService.error({
      nzTitle: 'Error',
      nzContent: 'Please log in first'
    });
    window.setTimeout(() => modal.destroy(), 1000);
  }

  success(): void {
    const modal = this.modalService.success({
      nzTitle: 'Success',
      nzContent: 'You have bookmarked this repository!'
    });

    window.setTimeout(() => modal.destroy(), 1000);
  }

  checkFavRepoExist(repo_id) {
    if (this.auth.isAuthenticated()) {
      return this.favoriteRepos.some(repo => repo.repo_id === repo_id)
    } else {
      return false
    }
  }

}
