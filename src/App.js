import React from "react";
import GlobalChart from "./components/GlobalChart";
import HeaderInfos from "./components/HeaderInfos";
import "./styles/index.scss";

const App = () => {
  return (
    <div>
      <div className="app-container">
        <header>
          <HeaderInfos />
          <GlobalChart />
        </header>
      </div>
    </div>
  );
};

export default App;
