import React, { useEffect, useState } from "react";
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
        setTransactions(transactions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const total = transactions?.map((a) => a.amount).reduce((a, b) => a + b);

  return !transactions ? (
    <div>Loading...</div>
  ) : (
    <div>
      {transactions.map((transaction, index) => (
        <div key={`${transaction.amount}_${transaction.date}`}>
          <div>
            Transaction #{index + 1} from {transaction.date}
          </div>
          <div>Amount: {`${transaction.amount} rubles`}</div>
        </div>
      ))}
      {total !== undefined && (
        <div>It remains to pay off: {INITIAL_DEBT - total} rubles</div>
      )}
      {total === undefined && <div>it remains to pay off: ? rubles</div>}
    </div>
  );
}

export default App;
