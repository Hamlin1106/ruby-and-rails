import { factoryFragment, productFragment } from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query line($id: ID!) {
    line(id: $id) {
      id
      name
      factoryId
      productId
      takt
      codeCount
      userCount
      factory {
        ...factoryFragment
      }
      product {
        ...productFragment
      }
    }
  }
  ${factoryFragment}
  ${productFragment}
`;
