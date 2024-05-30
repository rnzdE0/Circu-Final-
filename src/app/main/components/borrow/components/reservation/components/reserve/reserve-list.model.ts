export interface ReservationList {
    id: number;
    user_id: number;
    book_id: number;
    username: string;
    user: {
      id: number;
      username: string;
      role: string;
      patron:{
        patron: string;
      }
      program:{
        department:{
          department:string;
        }
        category:string;
      }
    };
    
  }

export interface OnlineList {
  id: number;
    user_id: number;
    book_id: number;
    username: string;
    user: {
      id: number;
      username: string;
      role: string;
      patron:{
        patron: string;
      }
      program:{
        department:{
          department:string;
        }
        category:string;
      }
    };
 
}
