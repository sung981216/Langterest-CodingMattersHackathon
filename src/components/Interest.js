import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your post"
                  value={newInterest}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input type="submit" value="Update Post" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          {interestObj.creatorName && (
            <h4 style={{ fontWeight: "bold" }}>{interestObj.creatorName}</h4>
          )}

          <h4
            style={{
              paddingTop: 20,
            }}
          >
            {interestObj.text}
          </h4>
          {interestObj.attachmentUrl && (
            <img src={interestObj.attachmentUrl} alt="newPost" />
          )}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Interest;
