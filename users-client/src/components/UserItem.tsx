import { useEffect, useState } from "react";
import { useUsers } from "../context/useUsers";
import { Role } from "../enum/user";
import { User } from "../interface/user.interface";
import { IoTrash } from "react-icons/io5";

interface Props {
  user: User;
}

function UserItem({ user }: Props) {
  const { deleteUser, updateUser } = useUsers();
  const [userRole, setUserRole] = useState<Role | null>(null)

    useEffect(() => {
        if(userRole) {
            updateUser(user._id, {role: userRole})
        }
    },[userRole])

  return (
    <div className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer">
      <div className="flex justify-between">
        <h3 className="p-2 my-2 font-bold">{user.name}</h3>
        <p className="p-2 my-2 text-slate-400">{user.email}</p>
        {user.role && (
                <p className="p-2 my-2 text-green-500">{user.role.toUpperCase()}</p> 
            )}
      </div>
      <div className="flex gap-x-2">
            {user.role === Role.STUDENT ? (
                <button  className="border-2 border-yellow-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" onClick={() => setUserRole(Role.ADMIN)}>Make admin</button>
            ) : (
                <button  className="border-2 border-blue-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" onClick={() => setUserRole(Role.STUDENT)}>Make student</button>
            )}
        <button
          onClick={() => {
            if (!window.confirm("Are you sure you want to delete it?")) return;
            deleteUser(user._id);
          }}
        >
          <IoTrash className="hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default UserItem;