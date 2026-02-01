import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PATIENT } from "../graphql/patientQueries";
import { CREATE_PATIENT, UPDATE_PATIENT } from "../graphql/patientMutations";
import PatientForm from "../components/PatientForm";
import { useAuthStore } from "../store/useAuthStore";

export default function PatientFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { data, loading: loadingPatient } = useQuery(GET_PATIENT, {
    skip: !isEdit,
    variables: { id },
  });

  const role = useAuthStore((s) => s.role);

  const [createPatient, { loading: creating }] = useMutation(CREATE_PATIENT);
  const [updatePatient, { loading: updating }] = useMutation(UPDATE_PATIENT);

  const handleSubmit = async (input) => {
    try {
      if (isEdit) {
        await updatePatient({ variables: { id, input } });
      } else {
        await createPatient({ variables: { input } });
      }
    } catch {}
    navigate("/");
  };

  // ACCESS CONTROL
  if (role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md w-full text-center animate-fade-up">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            You do not have permission to access this page.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="
              px-4 py-2 rounded-lg
              border border-gray-300
              text-sm font-medium text-gray-600
              transition-all
              hover:bg-gray-100 hover:text-gray-900
              active:scale-95
            "
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (isEdit && loadingPatient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl text-sm text-gray-500 animate-pulse">
          Loading patient...
        </div>
      </div>
    );
  }

  // MAIN RENDER
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-6 animate-fade-up">

        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="
                w-9 h-9 flex items-center justify-center
                rounded-lg border border-gray-300
                text-gray-600
                transition-all
                hover:bg-gray-100 hover:text-gray-900
                active:scale-95
              "
              title="Back"
            >
              ←
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {isEdit ? "Edit Patient" : "Add Patient"}
              </h1>
              <p className="text-sm text-gray-500">
                {isEdit
                  ? "Perbarui data pasien"
                  : "Tambahkan data pasien baru"}
              </p>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <PatientForm
            initialData={data?.patient}
            onSubmit={handleSubmit}
            loading={creating || updating}
          />
        </div>
      </div>
    </div>
  );
}
