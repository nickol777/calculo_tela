import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import fondo from "../../assets/fondo-home.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="home-card">
        <h2>¿Qué deseas producir?</h2>
        <button onClick={() => navigate("/toalla")}>Toallas</button>
        <button onClick={() => navigate("/empaque")}>Empaques</button>
        <button onClick={() => navigate("/poncho")}>Ponchos</button>
        <button onClick={() => navigate("/turbante")}>Turbantes</button>
      </div>
    </div>
  );
};

export default Home;
  