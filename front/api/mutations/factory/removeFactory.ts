import { factoryFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation removeFactory($id: ID!) {
    removeFactory(input: { id: $id }) {
      factory {
        ...factoryFragment
      }
      error
    }
  }
  ${factoryFragment}
`;
