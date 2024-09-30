import { IUser } from "@/types/types";

const User = ({ user }: { user: IUser }) => {
  return (
    <>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </>
  );
};

export default User;
