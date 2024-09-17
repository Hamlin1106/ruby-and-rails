import { searchConditionFragment } from "../../fragments";
import gql from "graphql-tag";

export default gql`
  query searchConditions($search: SearchConditionSearch) {
    searchConditions(search: $search) {
      ...searchConditionFragment
    }
  }
  ${searchConditionFragment}
`;
