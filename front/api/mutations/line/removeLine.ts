import { lineFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation removeLine($id: ID!) {
    removeLine(input: { id: $id }) {
      line {
        ...lineFragment
      }
      error
    }
  }
  ${lineFragment}
`;
