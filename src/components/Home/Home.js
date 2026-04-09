import React from "react";

import NavBar from "../NavBar/NavBar";

const Home = ({ name }) => {
  return (
    <div>
      <NavBar />
      <h1>Hello {name}</h1>
    </div>
  );
};
export default Home;
