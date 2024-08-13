export interface ReservationList {
  id: number;
  user_id: number;
  first_name: string;
  book_id: string;
  title: string;
  borrow_date: string | null;
  queue_position: number;
  status_label: string;
  mode_of_reservation: number;
  department: string;
  reserve_date: string;
  reserve_expiration: string;
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
