import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/Routes';

console.log('Bootstrap loaded');

const container = document.getElementById('root');
console.log('Container:', container);

if (!container) {
  console.error('Root element not found!');
  document.body.innerHTML = '<h1>Error: Root element not found</h1>';
  throw new Error('Failed to find the root element');
}

try {
  const root = createRoot(container);
  console.log('Root created');
  
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  console.log('App rendered');
} catch (error) {
  console.error('Error rendering app:', error);
  document.body.innerHTML = '<h1>Error: ' + error.message + '</h1>';
}