import React from "react";
import { NavbarContainer } from "../../styles";

const date = new Date();
const nowDate = date.toUTCString();

const Navbar = ({ handleLogout }) => {
  return (
    <NavbarContainer>
      <div>
        <h2>DASHBOARD</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            width: "100%",
            color: "#fff",
            fontSize: "16px",
            alignSelf: "center"
          }}
        >
          {nowDate}
        </div>
        <button style={{ background: "transparent" }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
