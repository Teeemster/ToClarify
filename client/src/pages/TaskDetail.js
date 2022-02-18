//Task detail
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Auth from "../utils/auth";
import { QUERY_TASK } from "../utils/queries";
import CommentList from "../components/CommentList";
import TimeLog from "../components/TimeLog";

const Sin
const TaskDetail = () => {
  const { id: taskId } = useParams();

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { id: taskId }
  });

  const task = data?.task || {};

  if (loading) {
    return <div>Loading...</div>;
  }

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
