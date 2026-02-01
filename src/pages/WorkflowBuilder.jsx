import { useState } from "react";
import { useWorkflowStore } from "../store/useWorkflowStore";
import { useNavigate } from "react-router-dom";

export default function WorkflowBuilder() {
  const { steps, addStep, removeStep, moveStepUp, moveStepDown } =
    useWorkflowStore();

  const [newStep, setNewStep] = useState("");

  const handleAdd = () => {
    if (!newStep.trim()) return;
    addStep(newStep.trim());
    setNewStep("");
  };
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-xl mx-auto animate-fade-up">

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
                <h1 className="text-2xl font-bold text-gray-900">
                    Workflow Builder
                </h1>
                <p className="text-sm text-gray-500">
                    Atur alur perawatan pasien
                </p>
                </div>
            </div>
        </div>

        {/* STEP LIST */}
        <ul className="space-y-3 mb-6">
          {steps.map((step, index) => (
            <li
              key={index}
              className="
                bg-white border border-gray-200 rounded-xl p-4
                flex justify-between items-center gap-3
                transition-all duration-300
                hover:shadow-md hover:-translate-y-[2px]
              "
            >
              {/* STEP INFO */}
              <div className="flex items-center gap-3">
                <div className="
                  w-8 h-8 flex items-center justify-center
                  rounded-full bg-red-50 text-red-600
                  text-sm font-bold
                ">
                  {index + 1}
                </div>
                <span className="text-gray-800 font-medium">
                  {step}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveStepUp(index)}
                  className="
                    w-8 h-8 flex items-center justify-center
                    border rounded-lg text-gray-600
                    transition-all
                    hover:bg-gray-100 hover:text-gray-900
                    active:scale-95
                  "
                  title="Move up"
                >
                  ↑
                </button>

                <button
                  onClick={() => moveStepDown(index)}
                  className="
                    w-8 h-8 flex items-center justify-center
                    border rounded-lg text-gray-600
                    transition-all
                    hover:bg-gray-100 hover:text-gray-900
                    active:scale-95
                  "
                  title="Move down"
                >
                  ↓
                </button>

                <button
                  onClick={() => removeStep(index)}
                  className="
                    w-8 h-8 flex items-center justify-center
                    border rounded-lg text-red-600
                    transition-all
                    hover:bg-red-50
                    active:scale-95
                  "
                  title="Remove step"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}

          {steps.length === 0 && (
            <li className="bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center text-sm text-gray-500">
              Belum ada workflow. Tambahkan step pertama 👇
            </li>
          )}
        </ul>

        {/* ADD STEP */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3">
          <input
            className="
              flex-1 border border-gray-300 rounded-lg
              px-4 py-2 text-sm
              transition-all
              focus:outline-none focus:ring-2 focus:ring-red-600
            "
            placeholder="New step..."
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />

          <button
            onClick={handleAdd}
            className="
              bg-red-600 text-white
              px-5 py-2 rounded-lg
              text-sm font-medium
              transition-all
              hover:bg-red-700 hover:scale-[1.02]
              active:scale-95
            "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
