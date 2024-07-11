export interface List {
    id: number;
    user_id: number;
    username: string;
    borrow_date: Date;
    date_returned: Date;
    user: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      program: {
        program: string;
      }
      department: {
        department: string;
      }
    };
    book: {
      title: string;
    };
  }