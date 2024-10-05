import { User } from "../model/users";

export interface UserState {
  users: User[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  searchQuery: number | null;
  user: User | null; 

}
