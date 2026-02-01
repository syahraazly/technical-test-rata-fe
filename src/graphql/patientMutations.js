import { gql } from "@apollo/client";

export const CREATE_PATIENT = gql`
  mutation CreatePatient($input: PatientInput!) {
    createPatient(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: ID!, $input: PatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      name
    }
  }
`;
