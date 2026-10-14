import React, { useState } from "react";
import "./Turbante.css";
import fondo from "../../assets/turbante.jpg";
import { useNavigate } from "react-router-dom";

const consumos = {
  Unico: { tela: 0.4, nylon: 2, hilo: 0.2, botones: 2, cordones: 2 },
};

const Turbante = () => {
  const [cantidad, setCantidad] = useState("");
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cantidad) return;

    const datos = consumos["Unico"];
    const cantidadNum = parseInt(cantidad);

    const tela = (datos.tela * cantidadNum).toFixed(2);
    const nylon = (datos.nylon * cantidadNum).toFixed(2);
    const hilo = (datos.hilo * cantidadNum).toFixed(2);
    const botones = datos.botones * cantidadNum;
    const cordones = datos.cordones * cantidadNum;

    setResultado({ tela, nylon, hilo, botones, cordones });
  };

  const handleReset = () => {
    setCantidad("");
    setResultado(null);
  };

  return (
    <div className="empaque-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="header-buttons">
        <div className="marca">TOMIC</div>
        <button className="volver-btn" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>

      <form onSubmit={handleSubmit} className="formulario-empaque">
        <h2>Vamos a fabricar turbantes</h2>

        <label>
          Cantidad:
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min={1}
            required
          />
        </label>

        <button type="submit">Calcular</button>
        <button type="button" onClick={handleReset}>
          Limpiar para nueva producción
        </button>
      </form>

      {resultado && (
        <div className="resultado">
          <h3>Resultado: insumos para fabricar {cantidad} turbante(s)</h3>
          <p><strong>Tela:</strong> {resultado.tela} m</p>
          <p><strong>Nylon:</strong> {resultado.nylon} g</p>
          <p><strong>Hilo:</strong> {resultado.hilo} yardas</p>
          <p><strong>Botones:</strong> {resultado.botones}</p>
          <p><strong>Cordones:</strong> {resultado.cordones}</p>
        </div>
      )}
    </div>
  );
};

export default Turbante;
