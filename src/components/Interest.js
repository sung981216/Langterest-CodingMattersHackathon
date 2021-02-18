import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Interest = ({ interestObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newInterest, setNewInterest] = useState(interestObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this post?");
    if (ok) {
      // Delete the post
      await dbService.doc(`interest/${interestObj.id}`).delete();
      await storageService.refFromURL(interestObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`interest/${interestObj.id}`).update({
      text: newInterest,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewInterest(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your post"
                  value={newInterest}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Post" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          {interestObj.creatorName && <h4>{interestObj.creatorName}</h4>}
          <h4>{interestObj.text}</h4>
          {interestObj.attachmentUrl && (
            <img
              src={interestObj.attachmentUrl}
              width="50px"
              height="50px"
              alt="newPost"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Interest;
