import { createReducer, on } from '@ngrx/store';
import { UserState,  } from './user.state';
import { loadUsersSuccess, loadUsersFailure, setCurrentPage, searchUsers, loadUserByIdSuccess, loadUserByIdFailure } from './user.action';

export const initialState: UserState = {
  users: [],
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  searchQuery: null,
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users, totalPages }) => ({
    ...state,
    users,
    totalPages,
    isLoading: false,
  })),
  on(loadUsersFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),
  on(searchUsers, (state, { query }) => ({
    ...state,
    searchQuery: query,
  })),

    on(loadUserByIdSuccess, (state, { user }) => ({
      ...state,
      user,
      isLoading: false,
    })),

    on(loadUserByIdFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
);
