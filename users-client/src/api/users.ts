import { CreateUser, UpdateUser } from "../interface/user.interface";

const API = "http://localhost:3000/api";

export const getUsersRequest = async () => fetch(`${API}/users`);

export const createUserRequest = async (user: CreateUser) =>
  fetch(`${API}/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteUserRequest = async (id: string) =>
  fetch(`${API}/users/${id}`, {
    method: "DELETE",
  });

export const updateUserRequest = async (id: string, user: UpdateUser) =>
  fetch(`${API}/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getUserRequest = async (id: string) => fetch(`${API}/users/${id}`);