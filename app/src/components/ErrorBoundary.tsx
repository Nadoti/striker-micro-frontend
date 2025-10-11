import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '2px solid #ff4444',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
        }}>
          <h2 style={{ color: '#cc0000' }}>⚠️ Erro ao Carregar Microfrontend</h2>
          <p>Ocorreu um erro ao carregar este componente.</p>
          <details style={{ marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer', color: '#666' }}>
              Ver detalhes do erro
            </summary>
            <pre style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              overflow: 'auto',
            }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '16px', color: '#333' }}>Possíveis causas:</h3>
            <ul style={{ color: '#666' }}>
              <li>O serviço do microfrontend não está rodando</li>
              <li>Erro de rede ou conexão</li>
              <li>Configuração incorreta do Module Federation</li>
            </ul>
            <h3 style={{ fontSize: '16px', color: '#333', marginTop: '15px' }}>
              Soluções:
            </h3>
            <ul style={{ color: '#666' }}>
              <li>Verifique se todos os serviços Docker estão rodando: <code>docker-compose ps</code></li>
              <li>Reinicie os serviços: <code>docker-compose restart</code></li>
              <li>Verifique se o remoteEntry.js está acessível no navegador</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

