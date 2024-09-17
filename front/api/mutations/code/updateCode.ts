import { codeFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation updateCode($id: ID!, $attributes: CodeAttributes!) {
    updateCode(input: { id: $id, attributes: $attributes }) {
      code {
        ...codeFragment
        line {
          id
          name
        }
      }
      error
    }
  }
  ${codeFragment}
`;
