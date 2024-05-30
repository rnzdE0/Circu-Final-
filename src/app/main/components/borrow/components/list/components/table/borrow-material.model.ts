export interface BorrowMaterial {
book_id: any;
status: any;
fine: any;
    id: number;
    user_id: number;
    username: string;
    user: {
            role: any;
            program: any;
            id: number;
            username: string;
            first_name: string;
            last_name: string;
            patron:{
              patron: string;
            }
            
          };
    


}