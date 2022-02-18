//Task detail
import React from "react";
import CommentList from "../CommentList";
import TimeLog from "../TimeLog";

const TaskDetail = () => {
  return (
    <div>
      <div>
        <div></div>
        <CommentList />
      </div>
      <div>
        <TimeLog />
      </div>
    </div>
  );
};

export default TaskDetail;
