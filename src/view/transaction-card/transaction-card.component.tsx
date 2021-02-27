import { memo } from "react";
import css from "./transaction-card.module.css";

interface TransactionCardProps {
  count: number;
  amount: number;
  date: string | null;
}

export const TransactionCard = memo<TransactionCardProps>((props) => {
  return (
    <div className={css.container}>
      <div>Transaction #{props.count}</div>
      <div>
        Amount: <span className={css.amount}>{props.amount} &#8381;</span>
      </div>
      <div>From: {props.date === null ? "unknown" : props.date}</div>
    </div>
  );
});
