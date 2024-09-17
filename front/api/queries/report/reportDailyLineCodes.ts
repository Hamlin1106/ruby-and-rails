import gql from "graphql-tag";

export default gql`
  query reportDailyLineCodes($search: ReportSearch) {
    reportDailyLineCodes(search: $search) {
      date
      count
    }
  }
`;
