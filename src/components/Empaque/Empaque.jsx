import React, { useState } from "react";
import "./Empaque.css";
import fondo from "../../assets/fondo-empaques.jpg";
import { useNavigate } from "react-router-dom";

const consumos = {
  "40x35": { tela: 0.3, nylon: 2, hilo: 0.2, etiqueta: 1, bandera: 1, cordon: 0.1 },
  "70x40": { tela: 0.5, nylon: 3, hilo: 0.3, etiqueta: 1, bandera: 1, cordon: 0.15 },
  "130x80": { tela: 0.9, nylon: 5, hilo: 0.5, etiqueta: 1, bandera: 1, cordon: 0.25 },
  "165x100": { tela: 1.2, nylon: 6, hilo: 0.6, etiqueta: 1, bandera: 1, cordon: 0.3 },
};

const Empaque = () => {
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
    const etiqueta = cantidadNum;
    const bandera = cantidadNum;
    const cordon = (datos.cordon * cantidadNum).toFixed(2);

    setResultado({ tela, nylon, hilo, etiqueta, bandera, cordon });
  };

  const handleReset = () => {
    setMedida("");
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
        <h2>Vamos a fabricar un empaque</h2>

        <label>
          Medida:
          <select value={medida} onChange={(e) => setMedida(e.target.value)} required>
            <option value="">Selecciona</option>
            {Object.keys(consumos).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
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
            Resultado: insumos para fabricar {cantidad} empaque(s) de medida {medida}
          </h3>
          <p><strong>Tela:</strong> {resultado.tela} m</p>
          <p><strong>Nylon:</strong> {resultado.nylon} g</p>
          <p><strong>Hilo:</strong> {resultado.hilo} yardas</p>
          <p><strong>Etiqueta:</strong> {resultado.etiqueta}</p>
          <p><strong>Bandera:</strong> {resultado.bandera}</p>
          <p><strong>Cordón:</strong> {resultado.cordon} m</p>
        </div>
      )}
    </div>
  );
};

export default Empaque;
