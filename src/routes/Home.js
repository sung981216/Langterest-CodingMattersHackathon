import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import Interest from "components/Interest";

const Home = ({ userObj }) => {
  const [interest, setInterest] = useState("");
  const [interests, setInterests] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService
      .collection("interest")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const interestArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInterests(interestArray);
      });
  }, []);

  const onSubmit = async (event) => {
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

  const onClearAttachmentClick = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={interest}
          onChange={onChange}
          placeholder="What's going on in Langley?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Post" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="post" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {interests.map((interest) => (
          <Interest
            key={interest.id}
            interestObj={interest}
            isOwner={interest.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
