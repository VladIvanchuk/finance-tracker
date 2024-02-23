import { initializeDefaultCategories } from "@/services/databaseInitialization";
import { useRealm } from "@realm/react";
import React, { createContext, ReactNode, useEffect } from "react";
import "react-native-get-random-values";
import Realm from "realm";

interface DatabaseContextValue {
  realm: Realm | null;
}

export const DatabaseContext = createContext<DatabaseContextValue | undefined>(
  undefined,
);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const realm = useRealm();

  useEffect(() => {
    if (realm) {
      initializeDefaultCategories(realm);
    }
  }, [realm]);

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
