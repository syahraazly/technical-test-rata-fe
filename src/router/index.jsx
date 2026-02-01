import { createBrowserRouter } from "react-router-dom";
import PatientList from "../pages/PatientList";
import PatientDetail from "../pages/PatientDetail";
import CreatePatient from "../pages/CreatePatient";
import EditPatient from "../pages/EditPatient";
import PatientFormPage from "../pages/PatientFormPage";
import AppointmentCalendar from "../pages/AppointmentCalendar";
import WorkflowBuilder from "../pages/WorkflowBuilder";

export const router = createBrowserRouter([
  { path: "/", element: <PatientList /> },
  { path: "/patients/:id", element: <PatientDetail /> },
  { path: "/patients/new", element: <PatientFormPage /> },
  { path: "/patients/:id/edit", element: <PatientFormPage /> },
  { path: "/appointments", element: <AppointmentCalendar /> },
  { path: "/workflow", element: <WorkflowBuilder /> },
]);
