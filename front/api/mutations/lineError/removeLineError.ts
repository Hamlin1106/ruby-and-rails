import { lineErrorFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation removeLineError($id: ID!) {
    removeLineError(input: { id: $id }) {
      lineError {
        ...lineErrorFragment
        line {
          id
          name
        }
      }
      error
    }
  }
  ${lineErrorFragment}
`;
