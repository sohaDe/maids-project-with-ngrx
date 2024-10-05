import { createAction, props } from '@ngrx/store';
import { User } from '../model/users';

export const loadUsers = createAction(
  '[User List] Load Users',
  props<{ page: number }>()
);

export const loadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: User[], totalPages: number }>()
);

export const loadUsersFailure = createAction(
  '[User API] Load Users Failure',
  props<{ error: any }>()
);

export const searchUsers = createAction(
  '[User List] Search Users',
  props<{ query: number }>()
);
export const setCurrentPage = createAction(
  '[User List] Set Current Page',
  props<{ page: number }>()
);
export const loadUserById = createAction(
  '[User API] Load User By ID',
  props<{ id: number }>()
);

export const loadUserByIdSuccess = createAction(
  '[User API] Load User By ID Success',
  props<{ user: User }>()
);

export const loadUserByIdFailure = createAction(
  '[User API] Load User By ID Failure',
  props<{ error: any }>()
);
