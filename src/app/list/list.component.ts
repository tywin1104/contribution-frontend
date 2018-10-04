import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  results: Observable<any>;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.results= this.apollo.watchQuery<any>({
      query: gql`
      {
        search(query:"good-first-issues:>10  stars:>20 pushed:>2018-09-01  is:public archived:false", type: REPOSITORY, first: 60) {
          repositoryCount
          edges {
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
    })
      .valueChanges
      .pipe(
        map(result => result.data.search.edges)
      );
  }

}
