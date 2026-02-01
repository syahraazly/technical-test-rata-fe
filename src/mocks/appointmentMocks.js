import { GET_APPOINTMENTS } from "../graphql/appointmentQueries";

export const appointmentMocks = [
  {
    request: {
      query: GET_APPOINTMENTS,
    },
    result: {
      data: {
        appointments: [
          {
            id: "a1",
            patientName: "John Doe",
            date: "2025-01-29",
            time: "09:00",
          },
          {
            id: "a2",
            patientName: "Jane Smith",
            date: "2025-01-30",
            time: "13:00",
          },
          {
            id: "a3",
            patientName: "Michael Lee",
            date: "2025-01-31",
            time: "10:30",
          },
        ],
      },
    },
  },
];
