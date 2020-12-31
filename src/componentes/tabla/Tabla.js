import React, { useEffect, useState } from "react";

/**
 *
 * funcion tabla que recibe como parametro un arreglo de objetos con
 * los datos que se van a pintar en esta
 * si no recibe nada, por defecto toma el valor de la asignación
 * @param {{
 *  data:Array,
 *  onRowClick:(row) => (e)=>{},
 *  onRowDobleClick:(row) => (e)=>{},
 *  camposOcultos:string[]
 * }} props
 */
const Tabla = ({
  data,
  onRowClick = () => {},
  onRowDobleClick = () => {},
  camposOcultos = [],
}) => {
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    let keys = Object.keys(data[0]);
    if (camposOcultos.length) {
      keys = keys.filter((key) => !camposOcultos.includes(key));
    }
    setCampos(keys);
  }, [data, camposOcultos]);

  return (
    //empezamos con una tabla html tipica, con algunaas clases de bootstrap basicas para darle forma
    <div className="table-responsive-md">
      <table className="table shadow table-striped table-md table-hover">
        <thead className="thead-dark">
          <tr>
            {/*aca obtengo todas las propiedades que tienen los objetos y las recorro para armar un header
            que se corresponda con la estructura de los objetos, esto podriamos procesar los datos y darle 
            el nombre que quisieramos tambien
          */}
            {campos.map((key, index) => (
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
            <tr
              className="user-select-none"
              onClick={onRowClick(row)}
              onDoubleClick={onRowDobleClick(row)}
              key={index}
            >
              {campos.map((campo, index) => {
                if (row[campo] !== undefined)
                  return <td key={index}>{row[campo].toString()}</td>;
                return undefined;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//luego exporto la tabla para poder utilizarla en otra parte del codigo
export default Tabla;
