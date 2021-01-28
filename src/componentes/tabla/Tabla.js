import React, { useEffect, useState } from "react";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
/**
 *
 * Componente tabla que recibe como parametro un arreglo de objetos con
 * los datos que se van a pintar en esta
 * si no recibe nada, por defecto toma el valor de la asignación
 * @param {{
 *  data:Array,
 *  onRowClick:(row) => (e)=>{},
 *  onRowDobleClick:(row) => (e)=>{},
 *  camposOcultos:string[],
 *  onHeaderSort:() => {}
 * }} props
 */
const Tabla = ({
  data,
  onRowClick = () => {},
  onRowDobleClick = () => {},
  camposOcultos = [],
  onHeaderSort,
}) => {
  const [campos, setCampos] = useState([]);
  const [sortUp, setSortUp] = useState({});

  useEffect(() => {
    let keys = Object.keys(data[0]);
    if (camposOcultos.length) {
      keys = keys.filter((key) => !camposOcultos.includes(key));
    }
    setCampos(keys);
  }, [data, camposOcultos]);
  const handleHeaderClick = (e) => {
    const { textContent } = e.target;
    setSortUp({ ...sortUp, [textContent]: !sortUp[textContent] });
    if (!onHeaderSort) return;
    onHeaderSort({
      [textContent]: !sortUp[textContent],
    });
  };

  return (
    //empezamos con una tabla html tipica, con algunaas clases de bootstrap basicas para darle forma
    <div className="table-responsive-md ">
      <table className="table  shadow table-striped table-md table-hover rounded">
        <thead className="thead-dark ">
          <tr className="">
            {/*aca obtengo todas las propiedades que tienen los objetos y las recorro para armar un header
            que se corresponda con la estructura de los objetos, esto podriamos procesar los datos y darle 
            el nombre que quisieramos tambien
          */}
            {campos.map((key, index) => (
              <th
                style={{ minWidth: "6rem", cursor: "pointer" }}
                key={index}
                className="user-select-none"
                onClick={handleHeaderClick}
              >
                {key}
                {onHeaderSort ? (
                  sortUp[key] === undefined ? (
                    <FaSort />
                  ) : sortUp[key] ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  )
                ) : null}
              </th>
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
                if (row[campo] !== undefined) {
                  if (typeof row[campo] === "boolean")
                    return (
                      <td key={index}>
                        <input
                          type="checkbox"
                          onChange={() => {}}
                          checked={row[campo]}
                        />
                      </td>
                    );
                  return <td key={index}>{row[campo].toString()}</td>;
                }
                return undefined;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
Tabla.defaultProps = {
  data: [{}],
};

//luego exporto la tabla para poder utilizarla en otra parte del codigo
export default Tabla;
