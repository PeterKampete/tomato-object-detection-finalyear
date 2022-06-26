import React from "react";
import { NavbarContainer } from "../../styles";
const Navbar = ({ handleLogout }) => {
  return (
    <NavbarContainer>
      <div>
        <h2>DASHBOARD</h2>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </NavbarContainer>
  );
};

export default Navbar;
