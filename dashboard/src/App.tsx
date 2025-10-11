import React, { useState }  from "react";
import InfoBox from "./components/InfoBox";
import BalanceBox from "./components/BalanceBox";
import ChartBox from "./components/ChartBox";
import "../styles/index.css"; // ← Adicionar esta linha
import FilterModal from "./components/FilterModal";
import NewTransactionModal from "./components/NewTransactionModalProps";

const entrada = "R$ 5.000,00";
const saida = "R$ 5.000,00";
const saldo = "R$ 5.000,00";
const data = "Sexta-feira, 05/09/2025";

export default function App() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  const handleFilter = (filters: any) => {
    console.log('Filtros aplicados:', filters);
    // Implemente sua lógica de filtro aqui
  };

  const handleCreateTransaction = (transaction: any) => {
    console.log('Nova transação:', transaction);
    // Implemente sua lógica de criação aqui
  };
  return (
  <div style={{ padding: "36px", background: "#18181f", minHeight: "100vh" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap" }}>
      <InfoBox label="Entrada:" value={entrada} />
      <InfoBox label="Saída:" value={saida} />
    </div>
    <BalanceBox value={saldo} date={data} />
    <ChartBox />
    <div>
      <button onClick={() => setIsFilterModalOpen(true)}>
        Abrir Filtro
      </button>
      <button onClick={() => setIsNewTransactionModalOpen(true)}>
        Nova Transação
      </button>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
      />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onClose={() => setIsNewTransactionModalOpen(false)}
        onCreate={handleCreateTransaction}
      />
    </div>
  </div>
)};