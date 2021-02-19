import React, { useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const InterestFactory = ({ userObj }) => {
  const [interest, setInterest] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    if (interest === "") {
      return;
    }
    event.preventDefault();

    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const interestObject = {
      text: interest,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      attachmentUrl,
    };
    await dbService.collection("interest").add(interestObject);
    setInterest("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterest(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => setAttachment("");

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          type="text"
          value={interest}
          onChange={onChange}
          placeholder="What's going on in Langley?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>

      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ opacity: 0 }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default InterestFactory;
