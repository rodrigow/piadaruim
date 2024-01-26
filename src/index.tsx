import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SWRConfig } from "swr";
import { swrConfig } from "./utils/config";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SWRConfig value={swrConfig()}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
