
import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("student");

  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      title: "STEM Excellence Scholarship",
      amount: "$2,000",
      deadline: "2025-12-01",
      status: "Not Applied",
    },
    {
      id: 2,
      title: "Community Leadership Award",
      amount: "$1,000",
      deadline: "2025-08-20",
      status: "Not Applied",
    },
  ]);

  const handleApply = (id) => {
    setScholarships((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Applied - Pending Review" } : s
      )
    );
  };

  const adminUpdateStatus = (id, newStatus) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  return (
    <>
      <header>
        <h1>Scholarship & Financial Aid Portal</h1>
        <nav>
          <button onClick={() => setPage("student")}>Student</button>
          <button onClick={() => setPage("admin")}>Admin</button>
        </nav>
      </header>

      <div className="container">
        {page === "student" && (
          <StudentPage scholarships={scholarships} onApply={handleApply} />
        )}

        {page === "admin" && (
          <AdminPage
            scholarships={scholarships}
            onUpdateStatus={adminUpdateStatus}
          />
        )}
      </div>
    </>
  );
}

/* -----------------------
   STUDENT PAGE
------------------------*/
function StudentPage({ scholarships, onApply }) {
  return (
    <div>
      <h2>Available Scholarships</h2>
      {scholarships.map((s) => (
        <div className="scholarship-card" key={s.id}>
          <h3>{s.title}</h3>
          <p><strong>Amount:</strong> {s.amount}</p>
          <p><strong>Deadline:</strong> {s.deadline}</p>
          <p className="status"><strong>Status:</strong> {s.status}</p>

          {s.status === "Not Applied" ? (
            <button className="apply" onClick={() => onApply(s.id)}>
              Apply Now
            </button>
          ) : (
            <p style={{ color: "#00a86b" }}>Application Submitted</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* -----------------------
   ADMIN PAGE
------------------------*/
function AdminPage({ scholarships, onUpdateStatus }) {
  return (
    <div>
      <h2>Admin: Manage Scholarship Applications</h2>
      {scholarships.map((s) => (
        <div className="scholarship-card" key={s.id}>
          <h3>{s.title}</h3>
          <p><strong>Amount:</strong> {s.amount}</p>
          <p><strong>Deadline:</strong> {s.deadline}</p>
          <p><strong>Current Status:</strong> {s.status}</p>

          <select
            onChange={(e) => onUpdateStatus(s.id, e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Update Status
            </option>
            <option value="Applied - Pending Review">Pending</option>
            <option value="Approved & Awarded">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      ))}
    </div>
  );
}
