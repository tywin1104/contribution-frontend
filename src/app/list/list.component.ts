import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { MydataserviceService } from '../mydataservice.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [MydataserviceService] 
})

export class ListComponent implements OnInit {
  current_cursor = null;
  results = [];
  repo_query = gql`
  query SearchRepos($queryString: String! , $cursor_val: String) {
    search(query: $queryString, type: REPOSITORY, after: $cursor_val, first: 10) {
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
  constructor(private apollo: Apollo, private service: MydataserviceService) { }

  // When we got data on a success
  onSuccess(res) {
    console.log(res);
    if (res != undefined) {
      res.forEach(item => {
        this.results.push(item);
      });
      this.current_cursor = this.results[this.results.length-1].cursor;
      console.log(`Current cursor is ${this.current_cursor}`);
    }
  }
  // When scroll down the screen
  onScroll()
  {
    console.log("Scrolled");
    this.append_repos();
  }

  ngOnInit() {
    this.append_repos();
  }

  append_repos() {
    this.apollo.watchQuery<any>({
      query: this.repo_query,
      variables: {
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

  // onScroll() {
  //   console.log('scrolled!!');
  // }
}
