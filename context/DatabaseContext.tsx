import React, { createContext, ReactNode, useEffect } from "react";
import { useRealm } from "@realm/react";
import Realm from "realm";

interface DatabaseContextValue {
  realm: Realm | null;
}

export const DatabaseContext = createContext<DatabaseContextValue | undefined>(
  undefined
);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const realm = useRealm();

  useEffect(() => {
    // Initialization of the database when the app starts
  }, []);

  const value: DatabaseContextValue = {
    realm,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;
