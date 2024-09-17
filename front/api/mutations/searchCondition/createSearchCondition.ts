import { searchConditionFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation createSearchCondition($attributes: SearchConditionAttributes!) {
    createSearchCondition(input: { attributes: $attributes }) {
      searchConditions {
        ...searchConditionFragment
      }
      error
    }
  }
  ${searchConditionFragment}
`;
