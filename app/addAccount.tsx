import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { IAccount } from "@/types/Accounts";
import AccountForm from "@/components/NewAccount/AccountForm";

const addAccount = () => {
  const [accountData, setAccountData] = useState<IAccount>({
    name: "",
    type: "",
    balance: "",
    currency: "UAH",
    bankName: "",
    accountNumber: undefined,
    notes: "",
  });

  return (
    <AccountForm accountData={accountData} setAccountData={setAccountData} />
  );
};

export default addAccount;

const styles = StyleSheet.create({});
