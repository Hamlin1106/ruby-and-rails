import { lineFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation updateLine($id: ID!, $attributes: LineAttributes!) {
    updateLine(input: { id: $id, attributes: $attributes }) {
      line {
        ...lineFragment
      }
      error
    }
  }
  ${lineFragment}
`;
