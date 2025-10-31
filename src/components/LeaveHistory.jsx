import React, { useEffect, useState } from "react";
import { getEmployeeLeaves } from "../services/LeaveService";
import { CircularProgress } from "@mui/material";

export const LeaveHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const email = "salaheddine.samid@saham.com";
    try {
      setLoading(true);
      const response = await getEmployeeLeaves(email);
      setRequests(response || []); // ensure safe access
    } catch (err) {
      console.error("Error fetching leaves:", err);
      setError("Failed to load leave history");
    } finally {
      setLoading(false);
    }
  };

  const statusMapper = (status) => {
    switch (status) {
        case "APPROVED":
            return { message: "Approuvée", color: "bg-success" };
            
        case "REJECTED":
            return { message: "Rejetée", color: "bg-danger" };
            
        case "IN_PROCESS":
            return { message: "En attente", color: "bg-warning text-dark" };
            
        case "CANCELLED":
            return { message: "Annulée", color: "bg-secondary" };
        default:
            return { message: "Inconnue", color: "bg-light text-dark" };
        }
    };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="leave-history-container p-4">
      {loading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {!loading && !error && requests.length === 0 && (
        <p className="text-center text-muted">Aucune demande de congé trouvée.</p>
      )}

      {!loading && requests.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Status</th>
              <th>Commentaire</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id || index}>
                <td>{index + 1}</td>
                <td>{req.type}</td>
                <td>{req.startDate}</td>
                <td>{req.endDate}</td>
                <td>
                    {(() => {
                        const { message, color } = statusMapper(req.status);
                        return <span className={`badge ${color}`}>{message}</span>;
                        })()}
                    </td>
                <td>{req.comment || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
