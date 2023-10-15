"use client";

import { type } from "os";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  createContext,
  SetStateAction,
  ReactNode,
  useState,
} from "react";
import Spinner from "@/components/spinner";
// import { createContext } from "vm"

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  loading: false,
  setLoading: () => {},
};

export const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  if (session === undefined) return <Spinner/>

  return (
    <GlobalContext.Provider value={{ loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
}
