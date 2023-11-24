import UserItem from "./UserItem";
import { useUsers } from "../context/useUsers";

function UsersList() {
  const { users } = useUsers();

  if (!users.length)
    return <p className="text-center text-xl font-bold my-4">No users Yet</p>;

  return (
    <div>
      {users.map((user) => (
        <UserItem user={user} key={user._id} />
      ))}
    </div>
  );
}

export default UsersList;