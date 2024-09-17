import { lineFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation createLine($attributes: LineAttributes!) {
    createLine(input: { attributes: $attributes }) {
      lines {
        ...lineFragment
      }
      error
    }
  }
  ${lineFragment}
`;
