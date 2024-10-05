import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {  User } from '../../model/users';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../../state/user.state';
import { loadUsers, searchUsers } from '../../state/user.action';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, CommonModule, RouterLink, RouterModule, RouterOutlet, HeaderComponent,MatProgressBarModule,MatProgressSpinnerModule,MatIconModule],
  animations: [
trigger('cardAppear', [
  state('void', style({
    transform: 'translateY(20px)',
    opacity: 0
  })),
  transition(':enter', [
    animate('1s ease-in-out', style({
      transform: 'translateY(0)',
      opacity: 1
    }))
  ])
]),

trigger('arrowHover', [
  state('inactive', style({
    transform: 'translateX(0)'
  })),
  state('active', style({
    transform: 'translateX(2px)'
  })),
  transition('inactive => active', animate('1ms ease-in-out')),
  transition('active => inactive', animate('1ms ease-in-out'))
])

  ],
  providers: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  totalPages$: Observable<number>;
  isLoading$: Observable<boolean>;
  currentPage: number = 1;
  filteredUsers$: Observable<User[]>;
  searchQuery: number
  constructor(private store: Store<{ user: UserState }>) {
    this.users$ = this.store.select(state => state.user.users);
    this.totalPages$ = this.store.select(state => state.user.totalPages);
    this.isLoading$ = this.store.select(state => state.user.isLoading);
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.store.dispatch(loadUsers({ page: this.currentPage }));
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.fetchUsers();
  }

  onSearch(searchQuery: number) {
    this.store.dispatch(searchUsers({ query: searchQuery }));
  }
}

