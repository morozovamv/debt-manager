import React, { memo } from "react";
import css from "./transaction-card.module.css";

interface TransactionCardProps {
  count: number;
  amount: number;
  date: string;
}

export const TransactionCard = memo<TransactionCardProps>((props) => {
  return (
    <div className={css.container}>
      <div>Transaction #{props.count}</div>
      <div>
        Amount: <span className={css.amount}>{props.amount}</span>&nbsp;rubles
      </div>
      <div>From: {props.date}</div>
    </div>
  );
});
