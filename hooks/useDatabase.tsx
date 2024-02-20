import DatabaseContext from "@/context/DatabaseContext";
import { useContext } from "react";
import Realm from "realm";

export const useDatabase = (): { realm: Realm } => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }

  return { realm: context.realm! };
};
