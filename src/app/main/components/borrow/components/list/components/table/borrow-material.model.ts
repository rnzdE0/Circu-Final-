export interface BorrowMaterial {

  name: string;
  email: string;
  program: string;
  department: string;
  title: string;
  status:string;
  fine:string;

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
  program: string;
  // program: {
  //   department_short: string;
  //   program_short: string;
  // }
}