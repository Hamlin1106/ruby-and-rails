import { factoryFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation updateFactory($id: ID!, $attributes: FactoryAttributes!) {
    updateFactory(input: { id: $id, attributes: $attributes }) {
      factory {
        ...factoryFragment
      }
      error
    }
  }
  ${factoryFragment}
`;
