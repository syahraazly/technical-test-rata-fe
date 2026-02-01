import { useMutation } from "@apollo/client/react";
import { UPDATE_PATIENT } from "../graphql/patientMutations";
import PatientForm from "../components/PatientForm";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatePatient, { loading }] = useMutation(UPDATE_PATIENT);

  const initialData = {
    name: "John Doe Updated",
    age: 33,
    gender: "Male",
  };

  const handleSubmit = async (input) => {
    await updatePatient({ variables: { id, input } });
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Patient</h1>
      <PatientForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
