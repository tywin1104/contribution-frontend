import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { MydataserviceService } from '../mydataservice.service';

import { Photos, PhotosObj } from '../../_modal'; 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [MydataserviceService] 
})

export class ListComponent implements OnInit {
  current_cursor :String;
  repo_query = gql`
  query SearchRepos($queryString: String!, $cursor_val: String) {
    search(query: $queryString, type: REPOSITORY, after: $cursor_val,first: 10) {
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
  results: Observable<any>;
  // myPhotosList: Photos[] = [];  
  // page: number = 1;
  constructor(private apollo: Apollo, private service: MydataserviceService) { }
  // ngOnInit() {  
  //   // To call api for initial image rendering  
  //   this.getPhotos();  
  // }
  //  // To get image data from api  
  //  getPhotos() {  
  //   console.log(this.page);  
  //   this.service.getMyPhotos(this.page).subscribe((res) => this.onSuccess(res));  
  // }  
  
  // // When we got data on a success  
  // onSuccess(res) {  
  //   console.log(res);  
  //   if (res != undefined) {  
  //     res.forEach(item => {
  //       this.myPhotosList.push(new PhotosObj(item));  
  //     });  
  //   }  
  // }  
  
  // // When scroll down the screen  
  // onScroll()  
  // {  
  //   console.log("Scrolled");  
  //   this.page = this.page + 1;  
  //   this.getPhotos();
  // }    

  ngOnInit() {
    this.results= this.apollo.watchQuery<any>({
      query: this.repo_query,
      variables: {
        queryString: "good-first-issues:>10  stars:>20 pushed:>2018-09-01  is:public archived:false",
        cursor_val: null
      }
    })
      .valueChanges
      .pipe(
        map(result => result.data.search.edges)
      );
  }

  // onScroll() {
  //   console.log('scrolled!!');
  // }
}
