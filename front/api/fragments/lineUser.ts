import gql from "graphql-tag";

export default gql`
  fragment lineUserFragment on LineUser {
    id
    lineId
    userId
  }
`;
