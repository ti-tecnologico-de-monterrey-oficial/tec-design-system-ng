// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import NxWelcome from "./nx-welcome";
import { BmbBadge } from '@ti-tecnologico-de-monterrey-oficial/ui-react';

export function App() {
  return (
    <div>
      <NxWelcome title="app-react"/>
      <div style={{ padding: '20px' }}>
        <h2>Prueba del Componente de la Librería:</h2>
        <BmbBadge appearance="normal" text="Badge text" container={true} />
      </div>
    </div>
  );
}

export default App;


