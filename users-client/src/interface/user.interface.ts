import { Role } from "../enum/user";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export type CreateUser = Omit<User, "_id" | "createdAt" | "updatedAt">;

export type UpdateUser = Partial<CreateUser>;