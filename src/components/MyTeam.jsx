import { useEffect, useState } from "react";
import { getSubordinates } from "../services/EmployeeService";
import { CircularProgress } from "@mui/material";
import WallCalendar from "./TimeLine";

export const MyTeam = ({ manager }) => {
  const [subordinates, setSubordinates] = useState([]); // list of subordinates and their leaves
  const [loading, setLoading] = useState(false);

  // fetch manager's team
  const fetchTeam = async () => {
    if (!manager?.email) return;
    try {
      setLoading(true);
      const res = await getSubordinates(manager.email);
      setSubordinates(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [manager?.email]);

  return (
    <div className="row p-3">
      {loading && subordinates.length === 0 && <CircularProgress />}

      {!loading && subordinates.length === 0 && (
        <p className="text-center">Aucun membre trouvé</p>
      )}
      
      <WallCalendar manager={manager} subordinates={subordinates}/>
    </div>
  );
};