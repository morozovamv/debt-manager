import { useEffect, useState } from "react";
import { TransactionCard } from "./view/transaction-card/transaction-card.component";
import { Total } from "./view/total/total.component";
import { useGetAllTransactionsQuery } from "./generated/graphql";

// TODO: move to prismic
const INITIAL_DEBT = 96500;

interface Transaction {
  amount?: number | null;
  date?: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const { data } = useGetAllTransactionsQuery();

  useEffect(() => {
    if (data) {
      const edges = data.allTransactions.edges;
      if (edges !== null && edges !== undefined && edges.length > 0) {
        const body = edges[0]?.node?.body;
        if (body !== null && body !== undefined && body.length > 0) {
          const fields = body[0].fields;
          if (fields !== null && fields !== undefined && fields.length > 0) {
            setTransactions(fields);
          }
        }
      }
    }
  }, [data]);

  return !transactions ? (
    <div>Loading....</div>
  ) : (
    <div>
      {transactions.map((transaction, index) => (
        <TransactionCard
          key={`${transaction.amount}_${transaction.date}`}
          count={index}
          amount={transaction.amount ?? getDefaultAmount()}
          date={formatDate(transaction.date)}
        />
      ))}
      <Total initialDebt={INITIAL_DEBT} total={getTotal(transactions)} />
    </div>
  );
}

const getTotal = (transactions: Transaction[]): number =>
  transactions
    .map((a) => a.amount ?? getDefaultAmount())
    .reduce((a, b) => a + b);

const getDefaultAmount = (): number => 0;

const formatDate = (date: string | null | undefined): string | null => {
  if (date !== null && date !== undefined) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(new Date(date));
  }
  return null;
};

export default App;
