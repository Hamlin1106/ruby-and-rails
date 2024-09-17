import { codeFragment } from "@/api/fragments";
import gql from "graphql-tag";

export default gql`
  mutation createCode($attributes: CodeAttributes!) {
    createCode(input: { attributes: $attributes }) {
      codes {
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
