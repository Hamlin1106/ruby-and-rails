import { productFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation removeProduct($id: ID!) {
    removeProduct(input: { id: $id }) {
      product {
        ...productFragment
      }
      error
    }
  }
  ${productFragment}
`;
