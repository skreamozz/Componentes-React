import "./App.css";
import { Principal, Tabla } from "./componentes";
//https://jsonplaceholder.typicode.com/todos

function App() {
  return (
    <div className="container">
      <Principal propiedad="lalala" />
      <Tabla
        data={[
          { id: "1", precio: 5, nombre: "desodorante" },
          { id: "2", precio: 6, nombre: "perfume" },
          { id: "3", precio: 7, nombre: "talco" },
          { id: "4", precio: 8, nombre: "pepe" },
          { id: "4", precio: 9, nombre: "ep" },
          { id: "4", precio: 10, nombre: "pe" },
          { id: "4", precio: 11, nombre: "p" },
        ]}
      />
    </div>
  );
}

export default App;
