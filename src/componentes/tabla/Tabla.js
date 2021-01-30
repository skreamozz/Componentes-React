import React, { useEffect, useState } from "react";
import {
  FaSortUp,
  FaSortDown,
  FaSort,
  FaFilter,
  FaWindowClose,
} from "react-icons/fa";
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
 *  onHeaderSort:(campo:{name:string,direction:boolean}) => {},
 *  onFilter:(filterInputs:object) =>{}
 * }} props
 *  @param  onHeaderSort evento de ordenamiento de la tabla
 *  @param  onFilter evento que se desencadena al actualizar los filtros. funcion de filtro.
 */
const Tabla = ({
  data,
  onRowClick = () => {},
  onRowDobleClick = () => {},
  camposOcultos = [],
  onHeaderSort,
  onFilter,
}) => {
  const [campos, setCampos] = useState([]);
  const [sortUp, setSortUp] = useState({});
  const [openFilter, setOpenFilter] = useState({});
  const [filterInputs, setFilterInputs] = useState({});

  useEffect(() => {
    let keys = Object.keys(data[0]);

    if (camposOcultos.length) {
      keys = keys.filter((key) => !camposOcultos.includes(key));
    }

    setCampos(keys);
  }, [data, camposOcultos]);

  //controlador del evento de click en el header
  const handleHeaderClick = (campo) => (e) => {
    e.stopPropagation();
    setSortUp({ [campo]: !sortUp[campo] });
    if (!onHeaderSort) return;
    onHeaderSort({
      name: campo,
      direction: !sortUp[campo],
    });
  };

  const handleFilterClick = (key) => (e) => {
    e.stopPropagation();
    setOpenFilter({
      [key]: !openFilter[key],
    });
  };

  const handleFilterInput = (e) => {
    const { name, value } = e.target;
    const filterInputsTemp = { ...filterInputs, [name]: value };
    setFilterInputs(filterInputsTemp);
    onFilter(filterInputsTemp);
  };

  const handleFilterCancel = (key) => (e) => {
    e.stopPropagation();
    handleFilterInput({
      target: { name: key, value: "" },
    });
    setOpenFilter({ ...openFilter, [key]: false });
  };

  return (
    //empezamos con una tabla html tipica, con algunaas clases de bootstrap basicas para darle forma
    <div className="table-responsive-md ">
      <table className="table  shadow   table-striped  table-hover rounded ">
        <thead className="thead-dark ">
          <tr className="">
            {campos.map((key, index) => (
              <th
                style={{ minWidth: "6rem" }}
                key={index}
                className="user-select-none"
              >
                <div className="d-flex justify-content-between align-items-center">
                  {/* Sorter */}
                  <div
                    onClick={handleHeaderClick(key)}
                    style={{ cursor: "pointer" }}
                  >
                    {key}
                    <span className="mx-1">
                      {onHeaderSort ? (
                        sortUp[key] === undefined ? (
                          <FaSort />
                        ) : sortUp[key] ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : null}
                    </span>
                  </div>
                  {/* end Sorter */}
                  {/* Filtros */}
                  {onFilter ? (
                    <div
                      className={` ${
                        filterInputs[key] && filterInputs[key] !== ""
                          ? "bg-primary"
                          : ""
                      } rounded px-2 text-center align-self-end p-relative`}
                      onClick={handleFilterClick(key)}
                    >
                      <FaFilter style={{ fontSize: ".8rem" }} />
                      {/* DropDown */}
                      <ul
                        onClick={(e) => e.stopPropagation()}
                        className={`${
                          !openFilter[key] ? "d-none" : ""
                        } position-absolute bg-light text-dark list-group mt-2`}
                        style={{
                          transform: "translateX(-50%)",
                          zIndex: "1000",
                        }}
                      >
                        <li className="list-group-item">
                          <h6>Filtro {key}</h6>
                        </li>
                        <li className="list-group-item">
                          <div className="form-group py-1 px-3">
                            <input
                              name={key}
                              value={filterInputs[key] || ""}
                              type="text"
                              className="form-control-sm"
                              onChange={handleFilterInput}
                            />
                            <label
                              onClick={handleFilterCancel(key)}
                              className="position-absolute px-2 mx-1  text-center "
                            >
                              <FaWindowClose />
                            </label>
                          </div>
                        </li>
                      </ul>
                      {/* End DropDown */}
                    </div>
                  ) : null}
                  {/* end Filtros */}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody>
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
