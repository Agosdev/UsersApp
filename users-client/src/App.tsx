import { useState } from "react";
import MPBrick from "./components/MPBrick";
import UserForm from "./components/UserForm";
import UsersList from "./components/UsersList";
import { UserProvider } from "./context/UserContext";
import { Role } from "./enum/user";

function App() {
  const [role, setRole] = useState('')

  return (
    <div className="h-screen  text-white flex justify-center items-center">

     {role === '' &&
      <div className="bg-gray-950 p-4 w-2/5">
        <h1 className="text-3xl font-bold text-center block my-2">Select your role:</h1>
        <button className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" onClick={() => setRole(Role.ADMIN)}>I'm a teacher</button>
        <button className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" onClick={() => setRole(Role.STUDENT)}>I'm a student</button>
      </div>
      }

    {role === Role.ADMIN &&
      <div className="bg-gray-950 p-4 w-2/5">
        <h1 className="text-3xl font-bold text-center block my-2">Prepare classroom</h1>
        <UserProvider>
          <UserForm />
          <UsersList />
        </UserProvider>
      </div>
      }

    {role === Role.STUDENT &&
      <div className="bg-gray-950 p-4 w-2/5">
        <h1 className="text-3xl font-bold text-center block my-2">Hi, Test!</h1>
         <MPBrick />
      </div>
    }
    </div>
  );
}

export default App;