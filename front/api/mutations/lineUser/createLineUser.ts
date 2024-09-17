import { lineUserFragment, userFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation createLineUser($attributes: LineUserAttributes!) {
    createLineUser(input: { attributes: $attributes }) {
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
