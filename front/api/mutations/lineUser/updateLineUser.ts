import { lineUserFragment, userFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation updateLineUser($id: ID!, $attributes: LineUserAttributes!) {
    updateLineUser(input: { id: $id, attributes: $attributes }) {
      lineUser {
        ...lineUserFragment
        line {
          id
          name
        }
        user {
          ...userFragment
        }
      }
      error
    }
  }
  ${lineUserFragment}
  ${userFragment}
`;
