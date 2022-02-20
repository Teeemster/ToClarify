// Time Log Component
import React from "react";

const TimeLog = (timeLog, totalHours) => {
  return (
    <div>
      <h3>Time Log</h3>
      <p className="fw-bold">{totalHours} total hours logged</p>
      <ul>
        {timeLog.length ? (
          timeLog.map((loggedTime) => (
            <li key={loggedTime._id}>
              <p>{loggedTime.description}</p>
              <p className="fs-italic">{`${loggedTime.hours} on ${loggedTime.date}`}</p>
            </li>
          ))
        ) : (
          <li>No time has been logged on this task, yet.</li>
        )}
      </ul>
    </div>
  );
};

export default TimeLog;
