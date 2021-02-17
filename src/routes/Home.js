import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
  const [interest, setInterest] = useState("");
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    dbService.collection("interest").onSnapshot((snapshot) => {
      const interestArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInterests(interestArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("interest").add({
      text: interest,
      createdAt: Date.now(),
      createrId: userObj.uid,
      createrName: userObj.displayName,
    });
    setInterest("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterest(value);
  };
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
        <input type="submit" value="Post" />
      </form>
      <div>
        {interests.map((interest) => (
          <div key={interest.id}>
            <h4>{interest.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
