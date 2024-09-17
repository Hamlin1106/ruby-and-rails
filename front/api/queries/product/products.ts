import { productFragment, factoryFragment } from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query products($search: MasterSearch) {
    products(search: $search) {
      ...productFragment
      factory {
        ...factoryFragment
      }
    }
  }
  ${productFragment}
  ${factoryFragment}
`;
