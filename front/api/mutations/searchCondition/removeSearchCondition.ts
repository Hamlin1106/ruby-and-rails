import { searchConditionFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation removeSearchCondition($id: ID!) {
    removeSearchCondition(input: { id: $id }) {
      searchCondition {
        ...searchConditionFragment
      }
      error
    }
  }
  ${searchConditionFragment}
`;
