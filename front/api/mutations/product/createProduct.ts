import { productFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation createProduct($attributes: ProductAttributes!) {
    createProduct(input: { attributes: $attributes }) {
      products {
        ...productFragment
        factory {
          id
          name
        }
      }
      error
    }
  }
  ${productFragment}
`;
