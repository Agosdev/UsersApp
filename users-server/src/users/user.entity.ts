export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
