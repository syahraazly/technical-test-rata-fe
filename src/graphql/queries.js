import { gql } from "@apollo/client";

export const GET_PATIENTSx = gql`
  query GetPatients($search: String) {
    patients(search: $search) {
      id
      name
      age
      gender
    }
  }
`;
