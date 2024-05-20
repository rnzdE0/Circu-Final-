export interface ReservationList {
    id: number;
    user_id: number;
    book_id: number;
    username: string;
    user: {
      id: number;
      username: string;
      role: string;
      // Add other user properties here
    };
    // Add other BorrowMaterial properties here
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
    // Add other user properties here
  };
  // Add other BorrowMaterial properties here
}