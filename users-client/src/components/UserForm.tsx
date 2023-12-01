import { ChangeEvent, FormEvent, useState } from "react";
import { useUsers } from "../context/useUsers";
import { Role } from "../enum/user";

function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: Role.STUDENT,
  });
  const { createUser } = useUsers();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser(user);
  };

  const formCompleted = user.name !== "" &&  user.email !== "" &&  user.password !== ""

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Username"
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />

      <input type="password" 
        name="password" 
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
        placeholder="Password" 
      />
        
        <select 
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
         value={user.role} 
         onChange={(e) =>
              setUser({
                ...user,
                role: e.target.value as Role,
              })
            }>
            <option value={Role.STUDENT}>STUDENT</option>
            <option value={Role.ADMIN}>ADMIN</option>
          </select>

      <button disabled={formCompleted ? false : true } type="submit"  className={formCompleted ? 'bg-green-500 px-3 block py-2 w-full'  : 'bg-gray-500 px-3 block py-2 w-full' }>
        Save
      </button>
    </form>
  );
}

export default UserForm;