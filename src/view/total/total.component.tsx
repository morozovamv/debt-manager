import React from "react";
import css from "./total.module.css";

interface TotalProps {
  total: number;
  initialDebt: number;
}

export const Total = (props: TotalProps) => (
  <div className={css.container}>
    It remains to pay off:{" "}
    <span className={css.totalValue}>
      {props.initialDebt - props.total} &#8381;
    </span>
  </div>
);
