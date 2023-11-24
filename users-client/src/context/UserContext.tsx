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
    getUsersRequest()
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const createUser = async (user: CreateUser) => {
    const response = await createUserRequest(user);
    const data = await response.json();
    setUsers([...users, data]);
  };

  const deleteUser = async (id: string) => {
    const response = await deleteUserRequest(id);
    console.log(response)
    if (response.status === 204) {
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  const updateUser = async (id: string, user: UpdateUser) => {
    const response = await updateUserRequest(id, user);
    const data = await response.json();
    console.log(data)
    setUsers(
      users.map((user) => (user._id === id ? { ...user, ...data } : user))
    );
  };

  return (
    <UserContext.Provider value={{ users, createUser, deleteUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};