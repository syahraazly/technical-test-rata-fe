import { useParams, Link } from "react-router-dom";

export default function PatientDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-up">

        {/* HEADER */}
        <div
          className="
            bg-white border border-gray-200 rounded-xl p-6 mb-6
            transition-all
            hover:border-red-300 hover:shadow-md
          "
        >
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="
                w-9 h-9 flex items-center justify-center
                rounded-lg border border-gray-300
                text-gray-600
                transition-all
                hover:bg-red-50 hover:text-red-600
                active:scale-95
              "
              title="Back"
            >
              ←
            </Link>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Patient Detail
              </h1>
              <p className="text-sm text-gray-500">
                Informasi lengkap pasien
              </p>
            </div>
          </div>
        </div>

        {/* PATIENT INFO */}
        <div
          className="
            bg-white border border-gray-200 rounded-xl p-6 mb-6
            transition-all duration-300
            hover:border-red-300 hover:shadow-md hover:-translate-y-[2px]
          "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Patient ID</p>
              <p className="font-medium text-gray-900">{id}</p>
            </div>

            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium text-gray-900">John Doe</p>
            </div>

            <div>
              <p className="text-gray-500">Age</p>
              <p className="font-medium text-gray-900">32</p>
            </div>

            <div>
              <p className="text-gray-500">Gender</p>
              <p className="font-medium text-gray-900">Male</p>
            </div>
          </div>
        </div>

        {/* VISIT HISTORY */}
        <div
          className="
            bg-white border border-gray-200 rounded-xl p-6
            transition-all
            hover:border-red-300 hover:shadow-md
          "
        >
          <h2 className="font-semibold text-gray-900 mb-3">
            Visit History
          </h2>

          <ul className="space-y-3">
            <li
              className="
                border border-gray-200 rounded-lg p-3
                bg-white
                transition-all duration-300
                hover:bg-red-50 hover:border-red-300
                hover:-translate-y-[1px]
              "
            >
              <p className="text-sm font-medium text-gray-900">
                General Checkup
              </p>
              <p className="text-xs text-gray-500">
                12 Jan 2025
              </p>
            </li>

            <li
              className="
                border border-gray-200 rounded-lg p-3
                bg-white
                transition-all duration-300
                hover:bg-red-50 hover:border-red-300
                hover:-translate-y-[1px]
              "
            >
              <p className="text-sm font-medium text-gray-900">
                Follow-up
              </p>
              <p className="text-xs text-gray-500">
                20 Feb 2025
              </p>
            </li>
          </ul>

          {/* EMPTY STATE */}
          {/* 
          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-500">
            No visit history
          </div>
          */}
        </div>

      </div>
    </div>
  );
}
