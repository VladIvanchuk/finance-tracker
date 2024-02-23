import AccountForm from "@/components/NewAccount/AccountForm";
import { useAccountActions } from "@/hooks/useAccountActions";
import { IAccount } from "@/types/AccountTypes";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

const AccountAdd = () => {
  const { id } = useLocalSearchParams();

  const { getAccountById } = useAccountActions();
  const account = getAccountById(id);

  if (!account) {
    throw new Error("Account not found");
  }

  const accountInfo = {
    ...account,
    transactions: Array.from(account.transactions),
  };

  const [accountData, setAccountData] = useState<IAccount>(accountInfo);

  return (
    <AccountForm
      type="edit"
      accountData={accountData}
      setAccountData={setAccountData}
    />
  );
};

export default AccountAdd;
