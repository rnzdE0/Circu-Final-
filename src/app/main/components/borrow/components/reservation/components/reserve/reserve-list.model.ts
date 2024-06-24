export interface ReservationList {
    id: number;
    user_id: number;
    book_id: number;
    username: string;
    queue_position:number;
    user: {
      id: number;
      username: string;
      role: string;
      first_name: string;
      last_name: string;
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
    book: {
      title: string;
    }
    
  }

export interface OnlineList {
  id: number;
    user_id: number;
    book_id: number;
    username: string;
    queue_position:number;
    user: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
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
    book: {
      title: string;
    }
}

export interface queueData{
  user_id: number;
  book_id: number;
  status: number;
  queue_position: number;
}
