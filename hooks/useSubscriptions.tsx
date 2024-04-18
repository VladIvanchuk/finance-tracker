import { Account } from "@/schemas/Account";
import { Category } from "@/schemas/Category";
import { Transaction } from "@/schemas/Transaction";
import { useUser, Realm, useQuery } from "@realm/react";

const manageSubscription = (
  realm: Realm,
  modelName: string,
  subscriptionName: string,
) => {
  const user = useUser()!;
  const query = useQuery(modelName, (items) => {
    return items.filtered("owner_id = $0", user.id);
  });

  realm.subscriptions.update((subs) => {
    subs.add(query, { name: subscriptionName });
  });
};

export const useSubscriptions = (realm: Realm) => {
  manageSubscription(realm, Account.name, "AccountsSubscription");
  manageSubscription(realm, Category.name, "CategoriesSubscription");
  manageSubscription(realm, Transaction.name, "TransactionsSubscription");
};
