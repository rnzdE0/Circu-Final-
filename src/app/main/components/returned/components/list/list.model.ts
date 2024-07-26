export interface List {
   id:number;
   fname:string;
   lname:string;
   email:string;
   department: {
      program_short: string;
      department_short: string;
   }
   date_borrowed:string;
   date_retuened:string;
   title:string;
   status:number;
   fine:number;
  }