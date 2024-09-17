import gql from "graphql-tag";

export default gql`
  fragment codeFragment on Code {
    id
    lineId
    name
  }
`;
