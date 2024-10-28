"use client";
import { app } from "@/firebase/config";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserType = {
  email: string | null;
  uid: string | null;
};
type AuthcontextType = {
  user: UserType | null;
};

type ProviderrType = {
  children: ReactNode;
};
const Authcontext = createContext<AuthcontextType | null>(null);

export function ContextProvider({ children }: ProviderrType) {
  const [user, setuser] = useState<UserType | null>(null);
  // router
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // console.log(user, "==========user========");
        const { email, uid } = user;
        setuser({ email, uid });
        // console.log("inside context=>", email, uid);
        router.push("/home");
      } else {
        // console.log("user are not loggin");
        router.push("/signup");
      }
    });
  }, []);

  return (
    <Authcontext.Provider value={{ user }}>{children}</Authcontext.Provider>
  );
}
export const UseAuthContext = () => {
  return useContext(Authcontext);
};
