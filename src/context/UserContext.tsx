import { createContext, Dispatch, useState } from "react";

export const UserContext = createContext<{
  user: any;
  setUser: Dispatch<any>;
}>({
  user: {},
  setUser: (user: any) => {},
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
