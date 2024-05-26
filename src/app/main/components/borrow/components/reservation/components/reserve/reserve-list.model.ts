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


// for testing
// export interface Reservation {
//   user: {
//     patron: {
//       patron: string;
//     };
//     user_id: string;
//     program: {
//       department: string;
//       category: string;
//     };
//   };
//   book_id: string;
//   book: {
//     isAvailable: boolean; // Ensure this field is present
//   };
//   request: string;
//   action: string;
// }

// export interface ReservationList {
//   id: number;
//   user_id: number;
//   book_id: number;
//   username: string;
//   user: {
//     id: number;
//     username: string;
//     role: string;
//     patron: string;
//     program: {
//       department: string;
//       category: string;
//     };
//   };
//   book: {
//     isAvailable: boolean;
//   };
//   request: string;
//   action: string;
// }

// export interface OnlineList {
//   id: number;
//   user_id: number;
//   book_id: number;
//   username: string;
//   user: {
//     id: number;
//     username: string;
//     role: string;
//     patron: string;
//     program: {
//       department: string;
//       category: string;
//     };
//   };
//   book: {
//     isAvailable: boolean;
//   };
//   request: string;
//   action: string;
// }