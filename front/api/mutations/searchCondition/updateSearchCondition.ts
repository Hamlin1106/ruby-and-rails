import { searchConditionFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation updateSearchCondition(
    $id: ID!
    $attributes: SearchConditionAttributes!
  ) {
    updateSearchCondition(input: { id: $id, attributes: $attributes }) {
      searchCondition {
        ...searchConditionFragment
      }
      error
    }
  }
  ${searchConditionFragment}
`;
