import { useState } from "react";
import "./App.css";
import { Tabla } from "./componentes";
//https://jsonplaceholder.typicode.com/todos

//array de datos original o por defecto
let datos = [
  { id: "1", precio: 5, nombre: "desodorante" },
  { id: "2", precio: 6, nombre: "perfume" },
  { id: "3", precio: 7, nombre: "talco" },
  { id: "4", precio: 8, nombre: "pepe" },
  { id: "4", precio: 9, nombre: "ep" },
  { id: "4", precio: 10, nombre: "pe" },
  { id: "4", precio: 11, nombre: "p" },
];

function App() {
  //estado que permite actualizar el componente cuando se modifican los datos
  const [datosState, setDatosState] = useState(datos);

  //evento que se desencadena cuando el input que usamos de filtro cambia
  //e es la variable que contiene todos los datos del evento tanto el elemento que envio
  //dicho evento como el tipo de evento y demas.
  const handleChange = (e) => {
    //creo una variable temporal con los datos filtrados de el arreglo
    //que tenemos como datos
    let temp = datosState.filter((dato) =>
      dato.nombre.includes(e.target.value)
    );
    //luego realizo comprovaciones para determinar que este arreglo nuevo no este vacio
    // o el input tenga texto en su interior
    if (temp.length === 0 || e.target.value === "") {
      //si alguna de las dos cosas pasan recargo el arreglo de datos con el array original.
      setDatosState(datos);
      return;
    }
    //si todo se realizo correctamente cambio el estado de los datos por
    //el nuevo arreglo filtrado.
    setDatosState(temp);
  };

  return (
    //elementos que se dibujan por pantalla
    <div className="container">
      {/* input en el cual desencadenamos el evento change pasandole la funcion que queremos 
        que se ejecute
      */}
      <input className="form-control" type="text" onChange={handleChange} />
      {/* una vez importado el componente se puede usar como si fuese una etiqueta html
        a la cual le tenemos que asignar los atributos que queremos que lleguen en las propiedades
        de el componente
      */}
      <Tabla data={datosState} />
    </div>
  );
}

export default App;
