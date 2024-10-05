import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User,  } from '../../model/users';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from "../../header/header.component";
import { loadUserById } from '../../state/user.action';
import { UserState } from '../../state/user.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, CommonModule, MatGridListModule, HeaderComponent],
  providers: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})

export class UserDetailComponent implements OnInit {
  user$: Observable<User | null>;
  id: number;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    this.user$ = this.store.select(state => state.user.user);
    this.isLoading$ = this.store.select(state => state.user.isLoading);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store.dispatch(loadUserById({ id: this.id }));
    });
  }

  onBack() {
    this.router.navigate(['../']);
  }
}


