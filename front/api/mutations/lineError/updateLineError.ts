import { lineErrorFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation updateLineError($id: ID!, $attributes: LineErrorAttributes!) {
    updateLineError(input: { id: $id, attributes: $attributes }) {
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
