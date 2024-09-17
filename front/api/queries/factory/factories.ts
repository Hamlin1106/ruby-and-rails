import { factoryFragment } from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query factories($search: MasterSearch) {
    factories(search: $search) {
      ...factoryFragment
    }
  }
  ${factoryFragment}
`;
