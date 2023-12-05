import axios from "axios";
import { CreateUser, UpdateUser } from "../interface/user.interface";
import { API } from "../constants/api.constants";

export const getUsersRequest = async () => {
  try {
    const response = await axios.get(`${API}/users`);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}


export const createUserRequest = async (user: CreateUser) => {
  try {
    const response = await axios.post(`${API}/users`, user);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};


export const deleteUserRequest = async (id: string) => {
  try {
    const response = await axios.delete(`${API}/users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const updateUserRequest = async (id: string, user: UpdateUser) => {
  try {
    const response = await axios.put(`${API}/users/${id}`, user);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}
 
export const getUserRequest = async (id: string) => {
  try {
    const response = await axios.get(`${API}/users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}
