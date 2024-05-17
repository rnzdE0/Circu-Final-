export interface User {
    id: number;
    username: string;
    role: string;
    patron_id: number;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    gender: string;
    ext_name: string | null;
    program_id: number;
    course_id: number | null;
    department: string;
    position: string;
    profile_image: string;
    main_address: string;
    domain_email: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  