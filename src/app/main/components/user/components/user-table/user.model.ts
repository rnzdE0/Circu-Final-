export interface User 
{
  id:number;
  fname:string;
  lname:string;
  gender:string;
  email:string;
  department:string;
  patron: {
    patron: string;
  }

  program: {
    department_short: string;
  }
  

  }
  