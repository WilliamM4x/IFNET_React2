import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          totalInventory
          description
          category{
              name
            }
          featuredImage {
            id
            url
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
        category{
              name
            }
      totalInventory
      featuredImage {
        url
      }
      variants(first: 1) {
        edges {
          node {
            price {
              amount
            }
          }
        }
      }
    }
  }
`;