import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Interest from "components/Interest";
import InterestFactory from "components/InterestFactory";

const Home = ({ userObj }) => {
  const [interests, setInterests] = useState([]);

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

  return (
    <div>
      <InterestFactory userObj={userObj} />
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
