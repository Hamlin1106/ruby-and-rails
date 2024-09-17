import gql from "graphql-tag";

export default gql`
  fragment productFragment on Product {
    id
    factoryId
    name
  }
`;
