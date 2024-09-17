import { lineFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  query reportAvailabilityRate($search: ReportSearch) {
    reportAvailabilityRate(search: $search) {
      lineId
      lineName
      date
      rate
      prevRate
    }
  }
  ${lineFragment}
`;
