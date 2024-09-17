import { factoryFragment, productFragment } from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query lines($search: MasterSearch) {
    lines(search: $search) {
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
