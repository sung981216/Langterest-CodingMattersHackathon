import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [interest, setPost] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("interest").add({
      interest,
      createdAt: Date.now(),
    });
    setPost("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
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
    </div>
  );
};

export default Home;
