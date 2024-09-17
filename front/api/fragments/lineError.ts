import gql from "graphql-tag";

export default gql`
  fragment lineErrorFragment on LineError {
    id
    lineId
    name
  }
`;
