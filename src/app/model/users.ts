
export class UserData {
  data: User;
}
export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
 export interface ApiResponse {
   page: number;
   per_page: number;
   total: number;
   total_pages: number;
   data: User[];
   support: {
     url: string;
     text: string;
   };
 }
 interface Support {
  url: string;
  text: string;
}
