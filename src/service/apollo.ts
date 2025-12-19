import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { relayStylePagination } from "@apollo/client/utilities";

const API_URL = "https://mock.shop/api"

export const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: API_URL }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    products: relayStylePagination(),
                },
            },
        }
    }),
});