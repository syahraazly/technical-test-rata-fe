import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Shield, User } from "lucide-react";

import { GET_PATIENTS } from "../graphql/patientQueries";
import { usePatientStore } from "../store/usePatientStore";
import { useAuthStore } from "../store/useAuthStore";

export default function PatientList() {
  // GLOBAL STATE
  const search = usePatientStore((s) => s.search);
  const setSearch = usePatientStore((s) => s.setSearch);
  const page = usePatientStore((s) => s.page);
  const setPage = usePatientStore((s) => s.setPage);
  const pageSize = usePatientStore((s) => s.pageSize);

  const role = useAuthStore((s) => s.role);
  const setRole = useAuthStore((s) => s.setRole);

  // LOCAL STATE
  const [keyword, setKeyword] = useState(search);
  const [openRole, setOpenRole] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(keyword.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword, setSearch]);

  // close dropdown when click outside
  useEffect(() => {
    const close = () => setOpenRole(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // DATA FETCHING
  const { data, loading } = useQuery(GET_PATIENTS, {
    variables: { search: "" },
  });

  // FILTERING & PAGINATION
  const filteredPatients = useMemo(() => {
    if (!data?.patients) return [];
    if (!search) return data.patients;
    return data.patients.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const paginatedPatients = filteredPatients.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-up">

        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-6 hover:shadow-md transition">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Patient Management
              </h1>
              <p className="text-sm text-gray-500">
                RATA Dental Clinic System
              </p>
            </div>

            {/* ROLE DROPDOWN */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenRole(!openRole);
                }}
                className="
                  w-full sm:w-auto
                  flex items-center gap-2
                  px-4 py-2
                  bg-white border border-gray-300 rounded-lg
                  text-sm font-medium text-gray-700
                  transition-all duration-200
                  hover:border-red-500 hover:shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-red-600
                "
              >
                {role === "admin" ? (
                  <Shield size={16} className="text-red-600" />
                ) : (
                  <User size={16} className="text-gray-500" />
                )}

                <span className="capitalize">{role}</span>

                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${
                    openRole ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openRole && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="
                    absolute right-0 mt-2 w-40
                    bg-white border border-gray-200 rounded-lg
                    shadow-lg overflow-hidden
                    animate-fade-up z-50
                  "
                >
                  <button
                    onClick={() => {
                      setRole("admin");
                      setOpenRole(false);
                    }}
                    className={`
                      flex items-center gap-2 w-full px-4 py-2 text-sm
                      transition-colors
                      ${
                        role === "admin"
                          ? "bg-red-50 text-red-600 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    <Shield size={14} /> Admin
                  </button>

                  <button
                    onClick={() => {
                      setRole("staff");
                      setOpenRole(false);
                    }}
                    className={`
                      flex items-center gap-2 w-full px-4 py-2 text-sm
                      transition-colors
                      ${
                        role === "staff"
                          ? "bg-red-50 text-red-600 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    <User size={14} /> Staff
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {role === "admin" && (
              <Link
                to="/patients/new"
                className="
                  flex justify-center items-center
                  bg-red-600 text-white text-sm font-medium
                  px-4 py-2 rounded-lg
                  transition-all
                  hover:bg-red-700 hover:scale-[1.02]
                  active:scale-95
                "
              >
                + Add Patient
              </Link>
            )}

            <Link
                to="/workflow"
                className="
                    flex justify-center items-center
                    border border-red-600
                    text-red-600 text-sm font-medium
                    px-4 py-2 rounded-lg
                    transition-all
                    hover:bg-red-50 hover:scale-[1.02]
                    active:scale-95
                "
                >
                Workflow Builder →
                </Link>
                <Link
              to="/appointments"
              className="
                flex justify-center items-center
                border border-gray-300
                text-gray-600
                text-sm font-medium
                px-4 py-2 rounded-lg
                transition-all
                hover:bg-gray-100
                active:scale-95
              "
            >
              View Appointments
            </Link>
          </div>

          {/* SEARCH */}
          <div className="mt-4">
            <input
              className="
                w-full border border-gray-300 rounded-lg
                px-4 py-3 text-sm
                transition-all
                focus:outline-none focus:ring-2 focus:ring-red-600
              "
              placeholder="Search patient by name..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* PATIENT LIST */}
        <div className="space-y-3">
          {loading && (
            <div className="bg-white p-4 rounded-xl animate-pulse text-sm text-gray-500">
              Loading patients...
            </div>
          )}

          {paginatedPatients.map((p, i) => (
            <div
              key={p.id}
              style={{ animationDelay: `${i * 60}ms` }}
              className="
                bg-white border border-gray-200 rounded-xl p-4
                flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3
                animate-fade-up
                transition-all duration-300
                hover:shadow-md hover:-translate-y-[2px]
              "
            >
              <div>
                <Link
                  to={`/patients/${p.id}`}
                  className="font-semibold text-gray-900 hover:text-red-600"
                >
                  {p.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {p.gender} · {p.age} years old
                </p>
              </div>

              {role === "admin" && (
                <Link
                  to={`/patients/${p.id}/edit`}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Edit
                </Link>
              )}
            </div>
          ))}

          {!loading && filteredPatients.length === 0 && (
            <div className="bg-white p-6 rounded-xl text-center text-sm text-gray-500">
              No patient found
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
