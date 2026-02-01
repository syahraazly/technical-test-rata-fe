import { GET_PATIENTS, GET_PATIENT } from "../graphql/patientQueries";
import { CREATE_PATIENT, UPDATE_PATIENT } from "../graphql/patientMutations";

export const patients = [
  { id: "1", name: "John Doe", age: 32, gender: "Male" },
  { id: "2", name: "Jane Smith", age: 28, gender: "Female" },
  { id: "3", name: "Michael Lee", age: 40, gender: "Male" },
  { id: "4", name: "Sarah Johnson", age: 35, gender: "Female" },
  { id: "5", name: "David Brown", age: 45, gender: "Male" },
  { id: "6", name: "Emily Davis", age: 22, gender: "Female" },
  { id: "7", name: "Daniel Wilson", age: 38, gender: "Male" },
  { id: "8", name: "Olivia Martinez", age: 29, gender: "Female" },
  { id: "9", name: "James Anderson", age: 50, gender: "Male" },
  { id: "10", name: "Sophia Taylor", age: 27, gender: "Female" },
  { id: "11", name: "William Thomas", age: 41, gender: "Male" },
  { id: "12", name: "Isabella Moore", age: 34, gender: "Female" },
  { id: "13", name: "Benjamin Jackson", age: 36, gender: "Male" },
  { id: "14", name: "Mia White", age: 24, gender: "Female" },
  { id: "15", name: "Alexander Harris", age: 47, gender: "Male" },
  { id: "16", name: "Charlotte Martin", age: 31, gender: "Female" },
  { id: "17", name: "Ethan Thompson", age: 39, gender: "Male" },
  { id: "18", name: "Amelia Garcia", age: 26, gender: "Female" },
  { id: "19", name: "Matthew Clark", age: 44, gender: "Male" },
  { id: "20", name: "Harper Lewis", age: 23, gender: "Female" },
  { id: "21", name: "Christopher Walker", age: 52, gender: "Male" },
  { id: "22", name: "Ava Hall", age: 30, gender: "Female" },
  { id: "23", name: "Joshua Allen", age: 37, gender: "Male" },
  { id: "24", name: "Ella Young", age: 21, gender: "Female" },
  { id: "25", name: "Andrew King", age: 48, gender: "Male" },
];

export const patientMocks = [
  // LIST
  {
    request: {
      query: GET_PATIENTS,
      variables: { search: "" },
    },
    result: { data: { patients } },
  },

  // DETAIL (id: 1)
  {
    request: {
      query: GET_PATIENT,
      variables: { id: "1" },
    },
    result: {
      data: { patient: patients[0] },
    },
  },
];
