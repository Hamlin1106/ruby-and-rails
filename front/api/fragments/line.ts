import gql from "graphql-tag";

export default gql`
  fragment lineFragment on Line {
    id
    name
    factoryId
    productId
    takt
  }
`;
