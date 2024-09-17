import { lineUserFragment, userFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation removeLineUser($id: ID!) {
    removeLineUser(input: { id: $id }) {
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
