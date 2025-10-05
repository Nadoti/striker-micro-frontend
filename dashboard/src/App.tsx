import React from "react";
import InfoBox from "./components/InfoBox";
import BalanceBox from "./components/BalanceBox";
import ChartBox from "./components/ChartBox";

const entrada = "R$ 5.000,00";
const saida = "R$ 5.000,00";
const saldo = "R$ 5.000,00";
const data = "Sexta-feira, 05/09/2025";

export default function App() {
  return (
  <div style={{ padding: "36px", background: "#18181f", minHeight: "100vh" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap" }}>
      <InfoBox label="Entrada:" value={entrada} />
      <InfoBox label="Saída:" value={saida} />
    </div>
    <BalanceBox value={saldo} date={data} />
    <ChartBox />
  </div>
)};
