// Comment Feed Component
import React from "react";

const CommentFeed = (comments) => {
  return (
    <div>
      <h3>Comments:</h3>
      {comments.length ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id} className="my-2">
              <p className="fw-bold fst-italic">{`${comment.user.firstName} ${comment.user.lastName} at ${comment.createdAt}`}</p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments, yet.</p>
      )}
    </div>
  );
};

export default CommentFeed;
