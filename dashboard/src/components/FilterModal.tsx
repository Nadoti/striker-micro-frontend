import React, { useState } from 'react';
import '../../styles/filter-modal.css';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterData) => void;
}

interface FilterData {
  valor: string;
  tipo: string;
  data: string;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onFilter }) => {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ valor, tipo, data });
    handleClose();
  };

  const handleClose = () => {
    setValor('');
    setTipo('');
    setData('');
    onClose();
  };

  const clearDate = () => {
    setData('');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          X
        </button>
        
        <h2 className="modal-title">Filtrar por:</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="modal-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="modal-input"
            />
          </div>

          <div className="form-group date-input-wrapper">
            <input
              type="date"
              placeholder="Data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="modal-input date-input"
            />
            {data && (
              <button
                type="button"
                className="clear-date-btn"
                onClick={clearDate}
              >
                x
              </button>
            )}
            <span className="date-dropdown-icon">▼</span>
          </div>

          <button type="submit" className="modal-submit-btn">
            Filtrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;