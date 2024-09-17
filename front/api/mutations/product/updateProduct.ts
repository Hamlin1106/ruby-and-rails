import { productFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation updateProduct($id: ID!, $attributes: ProductAttributes!) {
    updateProduct(input: { id: $id, attributes: $attributes }) {
      product {
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
