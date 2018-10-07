import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {
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
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.append_repos();
  }

  getIssueIcon(issueCount) {
    if(issueCount > 2000) {
      return "sentiment_very_dissatisfied"
    }else if(issueCount > 1000) {
      return "sentiment_dissatisfied"
    }else if(issueCount> 500) {
      return "sentiment_neutral"
    }else if(issueCount > 200) {
      return "sentiment_satisfied"
    }else {
      return "sentiment_very_satisfied"
    }
  }
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

  append_repos() {
    try {
      let cachedResponse = this.apollo.getClient().readQuery({
        query: this.repo_query
      });
      console.log("Found in Apollo cache!")
      console.log(cachedResponse)
    } catch(e) {
      console.log("Could not get from cache. Make request..")
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
}

