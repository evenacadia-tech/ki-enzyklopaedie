import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { initialisiereEinstellungen } from './einstellungen';
import '@fontsource-variable/geist/index.css';
import '@fontsource-variable/geist-mono/index.css';
import './styles.css';

initialisiereEinstellungen();

const wurzel = document.getElementById('root');
if (!wurzel) throw new Error('#root nicht gefunden');

createRoot(wurzel).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
