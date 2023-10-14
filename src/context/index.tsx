"use client";

import { type } from "os";
import {
   Dispatch,
   createContext,
   SetStateAction,
   ReactNode,
   useState,
} from "react";
// import { createContext } from "vm"

type ContextType = {
   loading: boolean;
   setLoading: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
   loading: false,
   setLoading: () => { },
};

export const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalState({ children }: { children: ReactNode }) {
   const [loading, setLoading] = useState(false);

   return (
      <GlobalContext.Provider value={{loading, setLoading}}>
         {children}
      </GlobalContext.Provider>
   );
}
