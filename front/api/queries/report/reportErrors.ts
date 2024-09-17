import gql from "graphql-tag";
import { lineFragment } from "../../fragments";

export default gql`
  query reportErrors($search: ReportSearch) {
    reportErrors(search: $search) {
      lineName
      count
    }
  }
  ${lineFragment}
`;
