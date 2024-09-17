import gql from "graphql-tag";

export default gql`
  query reportLineRate($search: ReportSearch) {
    reportLineRate(search: $search) {
      month
      lineId
      lineName
      rate
    }
  }
`;
