import React from "react";

/**
 *
 * funcion tabla que recive como parametro un arreglo de objetos con
 * los datos que se van a pintar en esta
 */
const Tabla = ({ data }) => {
  return (
    //empezamos con una tabla html tipica, con algunaas clases de bootstrap basicas para darle forma
    <table className="table table-dark table-bordered table-responsive-md table-hover">
      <thead className="bg-info">
        <tr>
          {/*aca obtengo todas las propiedades que tienen los objetos y las recorro para armar un header
            que se corresponda con la estructura de los objetos, esto podriamos procesar los datos y darle 
            el nombre que quisieramos tambien
          */}
          {Object.keys(data[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/**aca recorro todo el array objeto por objeto y voy pintando por cada objeto
         * una nueva fila de la tabla.
         * en cada fila de la tabla voy recorriendo las propiedades de los objetos para
         * obtener los valores a pintar en cada celda
         */}
        {data.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map((key, index) => (
              <td key={index}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//luego exporto la tabla para poder utilizarla en otra parte del codigo
export default Tabla;
