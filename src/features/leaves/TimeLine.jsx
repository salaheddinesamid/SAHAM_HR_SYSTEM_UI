import React, { useState, useEffect } from "react";
import "./styles/WallCalendar.css"
// Generate days between two dates
const generateDays = (start, end) => {
  const dates = [];
  const current = new Date(start);
  while (current <= new Date(end)) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const WallCalendar = ({manager, subordinates}) => {
    const [startDate, setStartDate] = useState("2025-11-01");
    const [endDate, setEndDate] = useState("2025-11-30");
    const [days, setDays] = useState(generateDays(startDate, endDate));
    const [pendingOnly, setPendingOnly] = useState(true);

  const isLeaveDay = (date,leaves)=>{
    return leaves?.find((leave)=>{
        const from = new Date(leave.fromDate);
        const to = new Date(leave.toDate);
        
        return date >= from && date <= to;
    })
  };

  const leaveMapper = (leave)=>{
    switch(leave?.leaveType){
        case "ANNUAL":
            return {type : "ANNUAL", bgColor : "#845EC2"}
        case "EXCEPTIONAL":
            return {type : "EXCEPTIONAL", bgColor : "#ff6b6b"}
    }
  }
  useEffect(() => {
    setDays(generateDays(startDate, endDate));
  }, [startDate, endDate]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <span> → </span>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <select className="form-select">
          <option>Filtrer par</option>
        </select>
        <select className="form-select">
          <option>Type de congé</option>
        </select>
      </div>
      <div className="calendar-grid">
        <div className="calendar-row header-row">
          <div className="user-column"></div>
          {days.map((date) => (
            <div key={date} className="day-cell">
              {date.toLocaleDateString("fr-FR", { weekday: "short" }).substring(0, 2)}
              <br />
              {date.getDate()}
            </div>
          ))}
        </div>

        {subordinates.map((user) => (
          <div key={user.id} className="calendar-row">
            <div className="user-column">{user.fullName}</div>
            {days.map((date) => {
              const leave = isLeaveDay(date,user.leaves);
              const mapper = leaveMapper(leave);
              return (
                <div
                  key={date}
                  className={`day-cell`}
                  style={{
                    backgroundColor : mapper?.bgColor
                  }}
                  title={leave ? `${leave.leaveType} du ${leave.fromDate} au ${leave.toDate}` : ""}
                >
                  {leave ? leave.leaveType[0] : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="legend">
        <span className="badge exceptionnel">Congé Exceptionnel</span>
        <span className="badge annuel">Congé Annuel</span>
        <span className="badge maladie">Maladie</span>
        <span className="badge remote">Télétravail</span>
      </div>
    </div>
  );
};

export default WallCalendar;
