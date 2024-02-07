import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { IAccount } from "@/types/Accounts";
import AccountForm from "@/components/NewAccount/AccountForm";
import { BSON } from "realm";

const addAccount = () => {
  const [accountData, setAccountData] = useState<IAccount>({
    _id: new BSON.ObjectId(),
    name: "",
    type: "",
    balance: 0,
    currency: "UAH",
    bankName: undefined,
    accountNumber: undefined,
    notes: undefined,
  });

  return (
    <AccountForm accountData={accountData} setAccountData={setAccountData} />
  );
};

export default addAccount;
