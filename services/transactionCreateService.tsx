import { Transaction } from "@/schemas/Transaction";
import { ITransaction } from "@/types/TransactionTypes";
import { BSON } from "realm";
import { Category } from "@/schemas/Category";
import { Account } from "@/schemas/Account";
import { ObjectId } from "bson";
import Realm from "realm";

export function handleIncomeExpenseOperation(
  realm: Realm,
  operation: ITransaction,
) {
  const account = getAccount(realm, operation.accountId);
  const category = getCategory(realm, operation.categoryId);

  const transactionData = {
    ...operation,
    account: account,
    category: category,
  };

  const transaction = realm.create(
    "Transaction",
    transactionData as Partial<Transaction>,
  );
  account.transactions.push(transaction);
  updateAccountBalance(account, operation);
}

export function handleTransferOperation(realm: Realm, operation: ITransaction) {
  const fromAccount = getAccount(realm, operation.fromAccountId);
  const toAccount = getAccount(realm, operation.toAccountId);

  if (fromAccount.balance < operation.sum) {
    throw new Error("Insufficient balance in FromAccount");
  }

  const transactionData = {
    ...operation,
    fromAccount: fromAccount,
    toAccount: toAccount,
  };

  const transaction = realm.create(
    "Transaction",
    transactionData as Partial<Transaction>,
  );
  fromAccount.transactions.push(transaction);
  toAccount.transactions.push(transaction);
  transferFunds(fromAccount, toAccount, operation.sum);
}

function getAccount(realm: Realm, accountId?: ObjectId) {
  const id = new BSON.ObjectId(accountId);
  const account = realm.objectForPrimaryKey<Account>("Account", id);
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
}

function getCategory(realm: Realm, categoryId?: ObjectId) {
  const id = new BSON.ObjectId(categoryId);
  const category = realm.objectForPrimaryKey<Category>("Category", id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
}

function updateAccountBalance(account: Account, operation: ITransaction) {
  if (operation.type === "income") {
    account.balance += operation.sum;
  } else if (operation.type === "expense") {
    account.balance -= operation.sum;
  }
}

function transferFunds(fromAccount: Account, toAccount: Account, sum: number) {
  fromAccount.balance -= sum;
  toAccount.balance += sum;
}
