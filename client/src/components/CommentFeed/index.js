// Comment Feed Component
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_TASK } from "../../utils/queries";

const CommentFeed = ({ comments, taskId }) => {
  const [newCommentInput, setNewCommentInput] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        // read task currently in cache
        const { task } = cache.readQuery({
          query: QUERY_TASK,
          variables: { id: taskId },
        });
        // add new comment to task's cache
        cache.writeQuery({
          query: QUERY_TASK,
          variables: { id: taskId },
          data: {
            task: { ...task, comments: [...task.comments, addComment] },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

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
            body: newCommentInput,
          },
        });
        // clear form
        setNewCommentInput("");
      } catch (e) {
        setSubmitError("Sorry, something went wrong.");
        console.error(e);
      }
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

          {submitError && (
            <div className="mb-2">
              <p className="form-error-msg fs-6">{submitError}</p>
            </div>
          )}

          <div className="my-1">
            <button className="btn btn-purple text-white fw-bold">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentFeed;
