import {
  codeFragment,
  factoryFragment,
  productFragment,
} from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query codes($search: MasterSearch) {
    codes(search: $search) {
      ...codeFragment
      line {
        id
        name
        factoryId
        productId
        factory {
          ...factoryFragment
        }
        product {
          ...productFragment
        }
      }
    }
  }
  ${codeFragment}
  ${factoryFragment}
  ${productFragment}
`;
