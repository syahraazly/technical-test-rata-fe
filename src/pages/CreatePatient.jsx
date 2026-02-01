import { useMutation } from "@apollo/client/react";
import { CREATE_PATIENT } from "../graphql/patientMutations";
import PatientForm from "../components/PatientForm";
import { useNavigate } from "react-router-dom";

export default function CreatePatient() {
  const navigate = useNavigate();
  const [createPatient, { loading }] = useMutation(CREATE_PATIENT);

  const handleSubmit = async (input) => {
    await createPatient({ variables: { input } });
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Patient</h1>
      <PatientForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
