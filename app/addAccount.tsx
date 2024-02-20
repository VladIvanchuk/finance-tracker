import "react-native-get-random-values";
import AccountForm from "@/components/NewAccount/AccountForm";
import { IAccount } from "@/types/AccountTypes";
import React, { useState } from "react";
import { BSON } from "realm";

const addAccount = () => {
  const [accountData, setAccountData] = useState<IAccount>({
    _id: new BSON.ObjectId(),
    createdAt: new Date(),
    name: "",
    type: "",
    balance: 0,
    currency: "UAH",
    bankName: undefined,
    accountNumber: undefined,
    notes: undefined,
    transactions: [],
  });

  return (
    <AccountForm accountData={accountData} setAccountData={setAccountData} />
  );
};

export default addAccount;
