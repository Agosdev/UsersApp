import UserForm from "./components/UserForm";
import UsersList from "./components/UsersList";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="h-screen  text-white flex justify-center items-center">
      <div className="bg-gray-950 p-4 w-2/5">
        <h1 className="text-3xl font-bold text-center block my-2">User Manager App</h1>
        <UserProvider>
          <UserForm />
          <UsersList />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;