import { createContext, useEffect, useState } from "react";
import { CreateUser, User, UpdateUser } from "../interface/user.interface";
import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
} from "../api/users";

interface UserContextValue {
  users: User[];
  createUser: (user: CreateUser) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUser: (id: string, user: UpdateUser) => Promise<void>;
}

export const UserContext = createContext<UserContextValue>({
  users: [],
  createUser: async () => {
    throw new Error("createUser() not implemented");
  },
  deleteUser: async () => {
    throw new Error("deleteUser() not implemented");
  },
  updateUser: async () => {
    throw new Error("updateUser() not implemented");
  },
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = async() => {
    const response = await getUsersRequest()
    setUsers(response?.data)
  }

  const createUser = async (user: CreateUser) => {
    const response = await createUserRequest(user);
    setUsers([...users, response?.data]);
  };

  const deleteUser = async (id: string) => {
    const response = await deleteUserRequest(id);
    console.log('response', response)
    setUsers(users.filter((user) => user._id !== id));
  };

  const updateUser = async (id: string, user: UpdateUser) => {
    const response = await updateUserRequest(id, user);
    setUsers(
      users.map((user) => (user._id === id ? { ...user, ...response?.data } : user))
    );
  };

  return (
    <UserContext.Provider value={{ users, createUser, deleteUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};