export interface BorrowMaterial {

  name: string;
  email: string;
  program: string;
  department: string;
  title: string;
  status:string;
  fine:string;
  accession:string;

  id: number;
  user_id: number;
  first_name: string;
  book_id: string;
  borrow_date: string | null;
  queue_position: number;
  status_label: string;
  mode_of_reservation: number;
  // program: {
  //   department_short: string;
  //   program_short: string;
  // }
}