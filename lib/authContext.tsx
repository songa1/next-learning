"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { checkLogin } from "./checkLogin";

const defaultValues: any = {
  user: null,
  authenticated: false,
};

const AuthContext = createContext(defaultValues);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await checkLogin();
      console.log(user);
      if (user) {
        setUser(user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return <AuthContext value={{ user, authenticated }}>{children}</AuthContext>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
