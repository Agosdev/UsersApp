import { createContext, useEffect, useRef, useState } from "react";
import { CreateUser, User, UpdateUser } from "../interface/user.interface";
import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
} from "../api/users";
import { Toast } from 'primereact/toast';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast: any = useRef(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = async() => {
    const response = await getUsersRequest()
    if(response?.status === 200) {
      toast.current.show({
        severity: 'success',
        summary: 'Users could be listed',
        life: 3500,
      });
      setUsers(response?.data)
    }
    else {
      toast.current.show({
        severity: 'error',
        summary: 'Users could not be listed',
        life: 3500,
      });
    }
  }

  const createUser = async (user: CreateUser) => {
    const response = await createUserRequest(user);
    if(response?.status === 201) {
      setUsers([...users, response?.data]);
    }
    else {
      toast.current.show({
        severity: 'error',
        summary: 'User could not be created',
        life: 3500,
      });
    }
  };

  const deleteUser = async (id: string) => {
    const response = await deleteUserRequest(id);
    if(response?.status === 204) {
      setUsers(users.filter((user) => user._id !== id));
    }
    else {
      toast.current.show({
        severity: 'error',
        summary: 'User could not be deleted',
        life: 3500,
      });
    }
  };

  const updateUser = async (id: string, user: UpdateUser) => {
    const response = await updateUserRequest(id, user);
    if(response?.status === 200) { 
      setUsers(
      users.map((user) => (user._id === id ? { ...user, ...response?.data } : user))
    );
    }
    else {
      toast.current.show({
        severity: 'error',
        summary: 'User could not be updated',
        life: 3500,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <UserContext.Provider value={{ users, createUser, deleteUser, updateUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};