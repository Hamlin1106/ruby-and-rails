import { codeFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation removeCode($id: ID!) {
    removeCode(input: { id: $id }) {
      code {
        ...codeFragment
      }
      error
    }
  }
  ${codeFragment}
`;
