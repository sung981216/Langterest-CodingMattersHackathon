import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHome, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link
          to="/"
          style={{
            marginRight: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faHome} color={"#97bc62ff"} size="2x" />
          <span style={{ marginTop: 10 }}>Home</span>
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#97bc62ff"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `${userObj.displayName}'s Profile`
              : "My Profile"}
          </span>
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUsers} color={"#97bc62ff"} size="2x" />
          <span style={{ marginTop: 10 }}>About Us</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
