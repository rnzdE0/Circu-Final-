export interface User 
{
  id:number;
  fname:string;
  lname:string;
  gender:string;
  email:string;
  department_short: string;
  patron: {
    patron: string;
  }
  department: {
    program_short: string;
    department_short: string;
  }

  program_short: string;
  

  }
  