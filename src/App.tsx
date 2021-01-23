import React, { useEffect, useState } from "react";
import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { TransactionCard } from "./view/transaction-card/transaction-card.component";
import { Total } from "./view/transaction-card/total/total.component";

const INITIAL_DEBT = 96500;

interface Transaction {
  amount: number;
  date: string;
}

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://debt-manager.prismic.io/graphql",
  }),
  cache: new InMemoryCache(),
});

function App() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allTransactions {
              edges {
                node {
                  body {
                    __typename
                    ... on TransactionBodyTransactions {
                      type
                      label
                      fields {
                        amount
                        date
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .then((response) => {
        console.log(response);
        const transactions: { amount: number; date: string }[] =
          response.data.allTransactions.edges[0].node.body[0].fields;
        setTransactions(transactions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return !transactions ? (
    <div>Loading...</div>
  ) : (
    <div>
      {transactions.map((transaction, index) => (
        <TransactionCard
          key={`${transaction.amount}_${transaction.date}`}
          count={index}
          amount={transaction.amount}
          date={new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
            timeStyle: "long",
          }).format(new Date(transaction.date))}
        />
      ))}
      <Total initialDebt={INITIAL_DEBT} total={getTotal(transactions)} />
    </div>
  );
}

const getTotal = (transactions: Transaction[]): number =>
  transactions.map((a) => a.amount).reduce((a, b) => a + b);

export default App;
