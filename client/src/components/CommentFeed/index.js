// Comment Feed Component
import React from "react";

const CommentFeed = (comments) => {
  return (
    <div>
      {comments.length ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
                <p>{comment.</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments, yet.</p>
      )}
    </div>
  );
};
