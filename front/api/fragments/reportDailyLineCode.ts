import gql from "graphql-tag";

export default gql`
  fragment reportDailyLineCodeFragment on ReportDailyLineCode {
    date
    count
  }
`;
