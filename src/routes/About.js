import React from "react";

const About = () => {
  return (
    <div>
      <img
        src="sung.jpg"
        alt="face"
        style={{
          width: 200,
          borderRadius: "50%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          paddingTop: 50,
          fontSize: "20px",
          width: "70%",
          lineHeight: 1.5,
        }}
      >
        <h5>
          Hello everyone! My name is Sung Na and this is my Hackathon project
          for the Township of Langley called Langterest!. The reason I created
          Langterest was to build an interactive online tool for community
          members to share their great experiences about the city of Langley.
          This will not only be a platform to share our experiences, but to also
          spread awarness about the cultural heritage of the First Nations that
          is related to this great city.
        </h5>

        <h5 style={{ paddingTop: 40 }}>
          I'm currently in my last term as a Computer Systems Technology student
          at British Columbia Institude of Technology. I'm currently in an
          option called Informations Systems which is about building full-stack
          applications required by medium and large businesses. Web Development
          is something I am very passionate about and my goal is to become a
          front-end developer after graduating from the program.
        </h5>

        <h5 style={{ paddingTop: 40 }}>
          Thank you for checking out my CodingMatters Hackathon Project!
        </h5>
      </div>
    </div>
  );
};

export default About;
