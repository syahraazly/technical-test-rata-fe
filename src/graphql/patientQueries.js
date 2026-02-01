import { gql } from "@apollo/client";

export const GET_PATIENTS = gql`
  query GetPatients($search: String) {
    patients(search: $search) {
      id
      name
      age
      gender
    }
  }
`;
export const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      name
      age
      gender
    }
  }
`;