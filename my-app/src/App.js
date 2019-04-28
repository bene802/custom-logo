import React from "react";
import "./App.css";
import MySideNav from "./components/SideBar";
import Intro from "./components/Intro";
function App() {
  return (
    <div className="App">
      <Intro />
      <MySideNav />
    </div>
  );
}

export default App;
