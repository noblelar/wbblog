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
import { BlogFormData } from "@/components/utils/types";
import { initialBlogFormData } from "@/components/utils";
// import { createContext } from "vm"

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  formData: BlogFormData;
  setFormData: Dispatch<SetStateAction<BlogFormData>>;
};

const initialState = {
  loading: false,
  setLoading: () => {},
  formData: initialBlogFormData,
  setFormData: () => {},
};

export const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialBlogFormData);
  const { data: session } = useSession();

  if (session === undefined) return <Spinner />;

  return (
    <GlobalContext.Provider
      value={{ loading, setLoading, formData, setFormData }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
