import { lineErrorFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation createLineError($attributes: LineErrorAttributes!) {
    createLineError(input: { attributes: $attributes }) {
      lineErrors {
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
