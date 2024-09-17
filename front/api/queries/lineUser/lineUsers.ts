import {
  lineUserFragment,
  userFragment,
  factoryFragment,
  productFragment,
} from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query lineUsers($search: MasterSearch) {
    lineUsers(search: $search) {
      ...lineUserFragment
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
      user {
        ...userFragment
      }
    }
  }
  ${lineUserFragment}
  ${userFragment}
  ${factoryFragment}
  ${productFragment}
`;
