import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUserById, loadUserByIdSuccess, loadUserByIdFailure } from './user.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiResponse, User } from '../model/users';

@Injectable()
export class UserEffects {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(action =>
        this.http.get<ApiResponse>(`${this.apiUrl}?page=${action.page}`).pipe(
          map(data => loadUsersSuccess({ users: data.data, totalPages: data.total_pages })),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  );

    loadUserById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadUserById),
        mergeMap(action =>
          this.http.get<{ data: User }>(`${this.apiUrl}/${action.id}`).pipe(
            map(response => loadUserByIdSuccess({ user: response.data })),
            catchError(error => of(loadUserByIdFailure({ error })))
          )
        )
      )
    );
}
