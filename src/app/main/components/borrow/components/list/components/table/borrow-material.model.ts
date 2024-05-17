export interface BorrowMaterial {
    id: number;
    user_id: number;
    username: string;
    user: {
      id: number;
      username: string;
      // Add other user properties here
    };
    // Add other BorrowMaterial properties here
  }