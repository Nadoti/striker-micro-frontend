import React, { useState } from 'react';
import '../../styles/new-transaction.css';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (transaction: TransactionData) => void;
}

interface TransactionData {
  nome: string;
  valor: string;
  tipo: string;
  data: string;
  comprovante?: File;
}

const NewTransactionModal: React.FC<NewTransactionModalProps> = ({ 
  isOpen, 
  onClose, 
  onCreate 
}) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      nome,
      valor,
      tipo,
      data,
      comprovante: comprovante || undefined
    });
    handleClose();
  };

  const handleClose = () => {
    setNome('');
    setValor('');
    setTipo('');
    setData('');
    setComprovante(null);
    setUploadFileName('');
    onClose();
  };

  const clearDate = (field: 'data1' | 'data2') => {
    setData('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComprovante(e.target.files[0]);
      setUploadFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          X
        </button>
        
        <h2 className="modal-title">Nova transação:</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="modal-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="modal-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="modal-input"
              required
            />
          </div>

          <div className="form-group date-input-wrapper">
            <input
              type="date"
              placeholder="Data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="modal-input date-input"
              required
            />
            {data && (
              <button
                type="button"
                className="clear-date-btn"
                onClick={() => clearDate('data1')}
              >
                x
              </button>
            )}
            <span className="date-dropdown-icon">▼</span>
          </div>

          <div className="form-group date-input-wrapper">
            <input
              type="date"
              placeholder="Data"
              className="modal-input date-input"
            />
            <button
              type="button"
              className="clear-date-btn"
            >
              x
            </button>
            <span className="date-dropdown-icon">▼</span>
          </div>

          <div className="form-group">
            <label className="upload-label">
              <input
                type="file"
                onChange={handleFileChange}
                className="upload-input"
                accept="image/*,.pdf"
              />
              <div className="upload-display">
                {uploadFileName || 'UPLOAD'}
              </div>
            </label>
          </div>

          <button type="submit" className="modal-submit-btn">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTransactionModal;