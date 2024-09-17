import gql from "graphql-tag";

export default gql`
  fragment factoryFragment on Factory {
    id
    name
  }
`;
