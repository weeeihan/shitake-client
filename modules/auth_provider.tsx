import { UserInfo } from "@/structs/structs";
import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext<{
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  user: UserInfo;
  setUser: (user: UserInfo) => void;
}>({
  authenticated: false,
  setAuthenticated: () => {},
  user: { name: "", roomID: "" },
  setUser: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo>({ name: "", roomID: "" });
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("User");

    if (!userInfo) {
      router.push("/");
      return;
    } else {
      const user: UserInfo = JSON.parse(userInfo);
      if (user) {
        setUser({
          name: user.name,
          roomID: user.roomID,
        });
        setAuthenticated(true);
      }
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
