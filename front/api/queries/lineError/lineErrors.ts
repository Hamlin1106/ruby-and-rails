import {
  factoryFragment,
  lineErrorFragment,
  productFragment,
} from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query lineErrors($search: MasterSearch) {
    lineErrors(search: $search) {
      ...lineErrorFragment
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
  ${lineErrorFragment}
  ${factoryFragment}
  ${productFragment}
`;
