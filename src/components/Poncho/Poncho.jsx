import React, { useState } from "react";
import "./Poncho.css";
import fondo from "../../assets/fondo-poncho.jpg";
import { useNavigate } from "react-router-dom";

const consumos = {
  Kids: { tela: 1.1, nylon: 3, hilo: 0.4, bandera: 1, logo: 1 },
  Adulto: { tela: 1.8, nylon: 6, hilo: 0.7, bandera: 1, logo: 1 },
};

const Poncho = () => {
  const [medida, setMedida] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medida || !cantidad) return;

    const datos = consumos[medida];
    const cantidadNum = parseInt(cantidad);

    const tela = (datos.tela * cantidadNum).toFixed(2);
    const nylon = (datos.nylon * cantidadNum).toFixed(2);
    const hilo = (datos.hilo * cantidadNum).toFixed(2);
    const bandera = cantidadNum;
    const logo = cantidadNum;

    setResultado({ tela, nylon, hilo, bandera, logo });
  };

  const handleReset = () => {
    setMedida("");
    setCantidad("");
    setResultado(null);
  };

  return (
    <div className="poncho-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="header-buttons">
        <div className="marca">TOMIC</div>
        <button className="volver-btn" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>

      <form onSubmit={handleSubmit} className="formulario-poncho">
        <h2>Vamos a fabricar un poncho</h2>

        <label>
          Medida:
          <select value={medida} onChange={(e) => setMedida(e.target.value)} required>
            <option value="">Selecciona</option>
            <option value="Kids">Kids</option>
            <option value="Adulto">Adulto</option>
          </select>
        </label>

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
          <h3>
            Resultado: insumos para fabricar {cantidad} poncho(s) talla {medida}
          </h3>
          <p><strong>Tela:</strong> {resultado.tela} m</p>
          <p><strong>Nylon:</strong> {resultado.nylon} g</p>
          <p><strong>Hilo:</strong> {resultado.hilo} yardas</p>
          <p><strong>Bandera:</strong> {resultado.bandera}</p>
          <p><strong>Logo:</strong> {resultado.logo}</p>
        </div>
      )}
    </div>
  );
};

export default Poncho;
