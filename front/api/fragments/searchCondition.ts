import gql from "graphql-tag";

export default gql`
  fragment searchConditionFragment on SearchCondition {
    id
    name
    reportType
    reportTypeI18n
    dateFrom
    dateTo
    monthFrom
    monthTo
    month
    lineIds
    codeIds
    isStandard
    standard
    isAvarage
    exceptZero
    position
    fontSize
  }
`;
