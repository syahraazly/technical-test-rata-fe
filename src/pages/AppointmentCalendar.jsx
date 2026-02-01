import { useQuery } from "@apollo/client/react";
import { GET_APPOINTMENTS } from "../graphql/appointmentQueries";
import { Link } from "react-router-dom";
import { useState } from "react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const monthDays = Array.from({ length: 30 }, (_, i) => i + 1); // mock 30 hari

export default function AppointmentCalendar() {
  const { data, loading } = useQuery(GET_APPOINTMENTS);
  const [viewMode, setViewMode] = useState("week"); // week | month

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl text-sm text-gray-500 animate-pulse">
          Loading calendar...
        </div>
      </div>
    );
  }

  const appointments = data?.appointments ?? [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6 animate-fade-up">

        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Appointment Calendar
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {viewMode === "week"
                  ? "Weekly schedule overview"
                  : "Monthly schedule overview"}
              </p>
            </div>

            {/* VIEW TOGGLE */}
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              {["week", "month"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`
                    px-4 py-2 text-sm font-medium transition-all
                    ${
                      viewMode === mode
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  {mode === "week" ? "Weekly" : "Monthly"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CALENDAR VIEW */}
        {viewMode === "week" ? (
          <WeeklyCalendar appointments={appointments} />
        ) : (
          <MonthlyCalendar appointments={appointments} />
        )}
      </div>
    </div>
  );
}

// WEEKLY VIEW
function WeeklyCalendar({ appointments }) {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 min-w-[700px]">
        {weekDays.map((day, i) => {
          const dayAppointments = appointments.filter((a) =>
            isSameWeekDay(a.date, day)
          );

          return (
            <div
              key={day}
              style={{ animationDelay: `${i * 60}ms` }}
              className="
                bg-white border border-gray-200 rounded-xl p-4
                animate-fade-up
                transition-all duration-300
                hover:shadow-md
              "
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">{day}</h2>
                <span className="text-xs text-gray-400">
                  {dayAppointments.length} appt
                </span>
              </div>

              <div className="space-y-2">
                {dayAppointments.map((a) => (
                  <AppointmentCard key={a.id} a={a} />
                ))}

                {dayAppointments.length === 0 && (
                  <EmptyDay />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// MONTHLY VIEW
function MonthlyCalendar({ appointments }) {
  return (
    <div className="grid grid-cols-7 gap-3">
      {monthDays.map((day) => {
        const dayAppointments = appointments.filter(
          (a) => getDayOfMonth(a.date) === day
        );

        return (
          <div
            key={day}
            className="
              bg-white border border-gray-200 rounded-lg p-3
              min-h-[120px]
              transition-all
              hover:shadow-md hover:border-red-300
            "
          >
            <div className="text-xs font-medium text-gray-500 mb-2">
              Day {day}
            </div>

            <div className="space-y-1">
              {dayAppointments.map((a) => (
                <AppointmentCard key={a.id} a={a} compact />
              ))}

              {dayAppointments.length === 0 && (
                <p className="text-xs text-gray-400">No appt</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// APPOINTMENT CARD COMPONENT
function AppointmentCard({ a, compact }) {
  return (
    <Link
      to={`/patients/${a.patientId}`}
      className={`
        block rounded-lg border
        ${compact ? "px-2 py-1" : "p-2"}
        bg-red-50 border-red-200
        transition-all
        hover:bg-red-100 hover:border-red-300
        hover:-translate-y-[1px] hover:shadow-sm
      `}
    >
      <p className="text-xs font-medium text-gray-900 truncate">
        {a.patientName}
      </p>
      {!compact && (
        <p className="text-xs text-gray-600">{a.time}</p>
      )}
    </Link>
  );
}

function EmptyDay() {
  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-3 text-center">
      <p className="text-xs text-gray-400">No appointments</p>
    </div>
  );
}

// HELPER FUNCTIONS
function isSameWeekDay(date, dayLabel) {
  const dayMap = {
    Mon: "2025-01-29",
    Tue: "2025-01-30",
    Wed: "2025-01-31",
    Thu: "2025-02-01",
    Fri: "2025-02-02",
  };
  return date === dayMap[dayLabel];
}

function getDayOfMonth(date) {
  return Number(date.split("-")[2]); // YYYY-MM-DD
}
