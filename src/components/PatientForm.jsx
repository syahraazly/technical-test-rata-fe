import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientForm({ initialData, onSubmit, loading }) {
  const navigate = useNavigate();

  const [name, setName] = useState(initialData?.name || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [gender, setGender] = useState(initialData?.gender || "");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  // VALIDATION
  useEffect(() => {
    const nextErrors = {};

    if (!name.trim()) nextErrors.name = "Name is required";
    if (!age) nextErrors.age = "Age is required";
    if (!gender) nextErrors.gender = "Gender is required";

    setErrors(nextErrors);
  }, [name, age, gender]);

  const isValid = Object.keys(errors).length === 0;

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isValid) return;

    await onSubmit({
      name,
      age: Number(age),
      gender,
    });

    // SUCCESS STATE
    setSuccess(true);

    // auto redirect after success
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  // SUCCESS MESSAGE
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl mb-4">
          ✓
        </div>
        <p className="text-sm font-medium text-gray-700">
          Patient saved successfully
        </p>
      </div>
    );
  }

  // FORM
  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          className={`
            w-full border rounded-lg px-4 py-2 text-sm
            transition-all
            focus:outline-none focus:ring-2
            ${
              submitted && errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-600"
            }
          `}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Patient name"
        />
        {submitted && errors.name && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      {/* AGE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age
        </label>
        <input
          type="number"
          className={`
            w-full border rounded-lg px-4 py-2 text-sm
            transition-all
            focus:outline-none focus:ring-2
            ${
              submitted && errors.age
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-600"
            }
          `}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Patient age"
        />
        {submitted && errors.age && (
          <p className="text-xs text-red-600 mt-1">{errors.age}</p>
        )}
      </div>

      {/* GENDER */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>

        <div className="flex gap-2">
          {["Male", "Female"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`
                flex-1 px-4 py-2 rounded-lg border text-sm font-medium
                transition-all
                ${
                  gender === g
                    ? "bg-red-600 text-white border-red-600"
                    : submitted && errors.gender
                    ? "border-red-500 text-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {g}
            </button>
          ))}
        </div>

        {submitted && errors.gender && (
          <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            w-full sm:w-auto
            px-5 py-2 rounded-lg
            border border-gray-300
            text-sm font-medium text-gray-600
            transition-all
            hover:bg-gray-100
            active:scale-95
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full sm:w-auto
            px-5 py-2 rounded-lg
            bg-red-600 text-white
            text-sm font-medium
            transition-all
            hover:bg-red-700 hover:scale-[1.02]
            active:scale-95
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
