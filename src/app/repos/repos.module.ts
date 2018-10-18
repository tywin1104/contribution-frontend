import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, concat, from } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod'
import { routing } from './repos-routing'

import { ListComponent } from './list/list.component';
import { RepoListComponent } from './list/repo-list/repo-list.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommunityReposComponent } from './list/community-repos/community-repos.component';
import { NavbarComponent } from './list/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ApolloModule,
    HttpLinkModule,
    InfiniteScrollModule,
    routing,
    NgZorroAntdModule
  ],
  declarations: [ListComponent, RepoListComponent, CommunityReposComponent, NavbarComponent],
  exports: [
    ListComponent,
    RepoListComponent
  ]
})
export class ReposModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // Basic link to connect to github graphql API
    const http = httpLink.create({ uri: 'https://api.github.com/graphql' });

    // Catch graphQL or network Errors
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    //Middleware to add auth github personal access token
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', environment.github_token)
      });
      return forward(operation);
    });

    let linkWithErrorCatching = concat(errorLink, http);

    apollo.create({
      link: concat(authMiddleware, linkWithErrorCatching),
      cache: new InMemoryCache()
    });
  }
}
