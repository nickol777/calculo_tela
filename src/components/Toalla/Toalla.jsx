import React, { useState } from "react";
import "./Toalla.css";
import fondo from "../../assets/fondo-toalla.png";
import { useNavigate } from "react-router-dom";

const consumos = {
  "30x30": { tela: 0.31, nylon: 35 / 20, hilo: 0.15, elastico: 0, rinde: 5 },
  "40x35": { tela: 0.351, nylon: 40 / 20, hilo: 0.15, elastico: 0, rinde: 4 },
  "70x40": { tela: 0.71, nylon: 70 / 20, hilo: 0.15, elastico: 0, rinde: 4 },
  "100x40": { tela: 1, nylon: 80 / 20, hilo: 0.2125, elastico: 0.2, rinde: 4 },
  "100x55": { tela: 1, nylon: 85 / 20, hilo: 0.2875, elastico: 0.2, rinde: 3 },
  "120x40": { tela: 1.21, nylon: 90 / 20, hilo: 0.2875, elastico: 0.2, rinde: 4 },
  "120x55": { tela: 1.21, nylon: 95 / 20, hilo: 0.425, elastico: 0.2, rinde: 3 },
  "130x78": { tela: 1.31, nylon: 100 / 20, hilo: 0.425, elastico: 0.22, rinde: 2 },
  "130x80": { tela: 1.31, nylon: 100 / 20, hilo: 0.425, elastico: 0.22, rinde: 2 },
  "165x100": { tela: 1, nylon: 110 / 20, hilo: 0.55, elastico: 0.22, rinde: 1 },
  "165x230": { tela: 2.3, nylon: 220 / 20, hilo: 0.8625, elastico: 0.4, rinde: 1 },
};

const Toalla = () => {
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [marquilla, setMarquilla] = useState("no");
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!talla || !cantidad) return;

    const datos = consumos[talla];
    const cantidadNum = parseInt(cantidad);

    const telaUsada = Math.ceil(cantidadNum / datos.rinde) * datos.tela;
    const nylon = (datos.nylon * cantidadNum).toFixed(2);
    const hilo = (datos.hilo * cantidadNum).toFixed(2);
    const elastico = (datos.elastico * cantidadNum).toFixed(2);
    const marquillas = marquilla !== "no" ? cantidadNum : 0;
    const totalFabricables = Math.ceil(cantidadNum / datos.rinde) * datos.rinde;
    const toallasExtra = totalFabricables - cantidadNum;

    setResultado({
      tela: telaUsada.toFixed(2),
      nylon,
      hilo,
      elastico,
      marquilla: marquillas,
      toallasExtra,
    });
  };

  const handleReset = () => {
    setTalla("");
    setCantidad("");
    setMarquilla("no");
    setResultado(null);
  };

  return (
    <div className="toalla-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="header-buttons">
        <div className="marca">TOMIC</div>
        <button className="volver-btn" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>

      <form onSubmit={handleSubmit} className="formulario-toalla">
        <h2>Vamos a fabricar una toalla</h2>

        <label>
          Tamaño:
          <select value={talla} onChange={(e) => setTalla(e.target.value)} required>
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

        <label>
          Marquilla:
          <select value={marquilla} onChange={(e) => setMarquilla(e.target.value)}>
            <option value="no">No lleva</option>
            <option value="generica">Genérica</option>
            <option value="tomic">TOMIC</option>
          </select>
        </label>

        <button type="submit" className="calcular-btn">
          Calcular
        </button>

        <button type="button" onClick={handleReset} className="limpiar-btn">
          Limpiar para nueva producción
        </button>
      </form>

      {resultado && (
        <div className="resultado">
          <h3>
            Resultado: los insumos para fabricar la toalla de {talla} en cantidad {cantidad} son:
          </h3>
          <p>
            <strong>Tela:</strong> {resultado.tela} m
          </p>
          <p>
            <strong>Nylon:</strong> {resultado.nylon} g
          </p>
          <p>
            <strong>Hilo:</strong> {resultado.hilo} yardas
          </p>
          <p>
            <strong>Elástico:</strong> {resultado.elastico} m
          </p>
          <p>
            <strong>Marquillas:</strong> {resultado.marquilla}
          </p>

          {resultado.toallasExtra > 0 && (
            <div className="alert-box">
              ¡Atención! <br /> Con esta tela podías haber fabricado{" "}
              <strong>{resultado.toallasExtra}</strong> toallas más.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Toalla;
