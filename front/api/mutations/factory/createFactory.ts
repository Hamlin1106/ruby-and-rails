import { factoryFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation createFactory($attributes: FactoryAttributes!) {
    createFactory(input: { attributes: $attributes }) {
      factory {
        ...factoryFragment
      }
      error
    }
  }
  ${factoryFragment}
`;
