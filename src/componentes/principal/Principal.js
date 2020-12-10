import React, { useState } from "react";

const Principal = ({ propiedad }) => {
  const [state, setState] = useState(0);
  return (
    <div className="row justify-content-center">
      <button
        //este evento lo capturo con una funcion "anonima"
        //esta funcion se crea y ejecuta al momento del evento
        onClick={() => {
          setState(state + 1);
        }}
      ></button>
      {
        //para ejecutar codigo javascrip o dibujar datos desde una variable
        //es necesario poner el codigo a ejecutar entre 2 llaves para
        //darle a entender a react que viene codigo javascript a procesar
      }
      {state}
    </div>
  );
};

//en esta linea exporto el componente para poder utilizarlo luego en otro componente o en donde
//quiera
export default Principal;
