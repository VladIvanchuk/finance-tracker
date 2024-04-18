import { useSubscriptions } from "@/hooks/useSubscriptions";
import { initializeDefaultCategories } from "@/services/databaseInitialization";
import { useRealm, useUser } from "@realm/react";
import React, { ReactNode, createContext, useEffect } from "react";
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
  const user = useUser()!;

  useSubscriptions(realm);

  useEffect(() => {
    if (realm) {
      initializeDefaultCategories(realm, user.id);
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
