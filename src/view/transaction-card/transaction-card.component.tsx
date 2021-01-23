import React, { memo } from "react";

interface TransactionCardProps {
  count: number;
  amount: number;
  date: string;
}

export const TransactionCard = memo<TransactionCardProps>((props) => {
  return (
    <div>
      <div>Transaction #{props.count}</div>
      <div>Amount: {`${props.amount} rubles`}</div>
      <div>From: {props.date}</div>
    </div>
  );
});
