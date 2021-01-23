import React from "react";

interface TotalProps {
  total: number;
  initialDebt: number;
}

export const Total = (props: TotalProps) => (
  <div>It remains to pay off: {props.initialDebt - props.total} rubles</div>
);
