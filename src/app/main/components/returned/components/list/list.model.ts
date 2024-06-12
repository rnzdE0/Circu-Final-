export interface List {
    id: number;
    user_id: number;
    username: string;
    user: {
      id: number;
      username: string;

      program: {
        program: string;
      }
      department: {
        department: string;
      }
    };
    // Add other BorrowMaterial properties here
  }