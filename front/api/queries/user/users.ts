import { userFragment } from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query users {
    users {
      ...userFragment
    }
  }
  ${userFragment}
`;
