// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import NxWelcome from "./nx-welcome";
import { Button } from '@ti-tecnologico-de-monterrey-oficial/ui-react';

export function App() {
  return (
    <div>
      <NxWelcome title="app-react"/>
      <div style={{ padding: '20px' }}>
        <h2>Prueba del Componente de la Librería:</h2>
        <Button label="Mi Botón React" />
      </div>
    </div>
  );
}

export default App;


