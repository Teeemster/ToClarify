// Comment Feed Component
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_COMMENT } from "../../utils/mutations";

const CommentFeed = ({comments, taskId}) => {
  const [newCommentInput, setNewCommentInput] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [addComment] = useMutation(ADD_COMMENT);

  const handleChange = (e) => {
    setNewCommentInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check for comment input before submitting
    if (newCommentInput) {
      try {
        // pass new comment to add comment mutation
        await addComment({
          variables: {
            taskId: taskId,
            body: newCommentInput
          }
        });
        // clear form
        setNewCommentInput("");
      } catch (e) {}
    }
  };

  return (
    <>
      <div>
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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              className="w-100"
              placeholder="Add a comment..."
              name="comment"
              value={newCommentInput}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="my-1">
            <button className="btn btn-purple text-white fw-bold">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentFeed;
