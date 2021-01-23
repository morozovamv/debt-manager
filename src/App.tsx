import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";

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
        console.log("--- transactions", transactions);
        setTransactions(transactions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const a = transactions?.map((a) => a.amount).reduce((a, b) => a + b);

  return (
    <div className="App">
      {transactions?.map((transaction) => (
        <div key={`${transaction.amount}_${transaction.date}`}>
          <div>{`${transaction.amount} rubles`}</div>
          <div>{transaction.date}</div>
        </div>
      ))}
      {a !== undefined && (
        <div>it remains to pay off: {INITIAL_DEBT - a} rubles</div>
      )}
      {a === undefined && <div>it remains to pay off: ? rubles</div>}
    </div>
  );
}

export default App;
