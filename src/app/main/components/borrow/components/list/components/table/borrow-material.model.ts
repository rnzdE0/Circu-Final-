export interface BorrowMaterial {
book_id: any;
status: any;
fine: any;
id: number;
user_id: number;
username: string;
user: {
        role: any;
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        patron:{
          patron: string;
        }
        program: {
          program: string;
          department: {
            department :string
          }
        }
      };
  book: {
    title: string;
  };
}