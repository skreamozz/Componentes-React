import { useEffect, useState } from "react";
import "./App.css";
import { TablaConFiltro } from "./componentes";
//https://jsonplaceholder.typicode.com/todos

//array de datos original o por defecto
/* let datos = [
  { id: "1", precio: 5, nombre: "desodorante" },
  { id: "2", precio: 6, nombre: "perfume" },
  { id: "3", precio: 7, nombre: "talco" },
  { id: "4", precio: 8, nombre: "pepe" },
  { id: "4", precio: 9, nombre: "ep" },
  { id: "4", precio: 10, nombre: "pe" },
  { id: "4", precio: 11, nombre: "p" },
]; */

function App() {
  //estado que permite actualizar el componente cuando se modifican los datos
  const [datosState, setDatosState] = useState();

  //efecto que se ejecuta cuando se monta el componente, este se encarga de traer los datos
  //de la api
  useEffect(() => {
    //funcion de javascript que se auto-ejecuta a si misma;
    (async () => {
      //fetch es una api que sirve para hacer peticiones html
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const json = await res.json();
      setDatosState(json);
    })();
  }, []);

  return (
    //elementos que se dibujan por pantalla
    <div className="container">
      {/* una vez importado el componente se puede usar como si fuese una etiqueta html
        a la cual le tenemos que asignar los atributos que queremos que lleguen en las propiedades
        de el componente
      */}
      <TablaConFiltro data={datosState} />
    </div>
  );
}

export default App;
