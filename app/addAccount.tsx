import "react-native-get-random-values";
import AccountForm from "@/components/NewAccount/AccountForm";
import { IAccount } from "@/types/AccountTypes";
import React, { useState } from "react";
import { BSON } from "realm";
import { useUser } from "@realm/react";

const addAccount = () => {
  const user = useUser()!;
  const [accountData, setAccountData] = useState<IAccount>({
    _id: new BSON.ObjectId(),
    owner_id: user.id,
    createdAt: new Date(),
    name: "",
    type: "",
    balance: 0,
    currency: "UAH",
    bankName: undefined,
    accountNumber: undefined,
    notes: undefined,
    transactions: [],
    disregard: false,
  });

  return (
    <AccountForm accountData={accountData} setAccountData={setAccountData} />
  );
};

export default addAccount;
