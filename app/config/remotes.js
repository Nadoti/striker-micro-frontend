// Configuração dos microfrontends por ambiente
const getRemotes = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // URLs de desenvolvimento (Docker local)
    return {
      dashboard: 'dashboard@http://localhost:8085/remoteEntry.js',
      home: 'home@http://localhost:8086/remoteEntry.js',
    };
  } else {
    // URLs de produção (Vercel)
    return {
      dashboard: 'dashboard@https://mfe-dashboard-cyan.vercel.app/remoteEntry.js',
      home: 'home@https://mfe-home-lovat.vercel.app/remoteEntry.js',
    };
  }
};

module.exports = { getRemotes };
