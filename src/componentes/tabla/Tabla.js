import React, { useEffect, useState } from "react";
import {
  FaSortUp,
  FaSortDown,
  FaSort,
  FaWindowClose,
  FaFilter,
  FaCheckCircle,
} from "react-icons/fa";
import FilterInputs from "./FilterInputs";
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
 *  onFilter:(filterInputs:object) => boolean
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
  const [filterError, setFilterError] = useState();

  /********************
   *
   * Efectos
   *
   ********************/

  useEffect(() => {
    let keys = Object.keys(data[0]);

    if (camposOcultos.length) {
      keys = keys.filter((key) => !camposOcultos.includes(key));
    }

    setCampos(keys);
  }, [data, camposOcultos]);

  /**
   *
   *  Handlers
   *
   */

  const handleHeaderClick = (campo) => (e) => {
    e.stopPropagation();
    if (onHeaderSort) {
      setSortUp({ [campo]: !sortUp[campo] });
      onHeaderSort({
        name: campo,
        direction: !sortUp[campo],
      });
    }
  };

  const handleFilterClick = (key) => (e) => {
    e.stopPropagation();
    setOpenFilter({
      [key]: !openFilter[key],
    });
  };

  const handleFilterInput = (e) => {
    const { name, value, checked, type } = e.target;

    //se agrega el nuevo valor que se va a utilizar a la hora de filtrar.
    const filterInputsTemp = {
      ...filterInputs,
      [name]: type && type === "checkbox" ? checked : value,
    };

    //actualizacion del estado.
    setFilterInputs(filterInputsTemp);
    setSortUp({});

    //ejecucion del filtro.
    if (!onFilter(filterInputsTemp)) {
      setFilterError(true);
      return;
    }

    setFilterError();
  };

  const handleFilterCancel = (key) => (e) => {
    e.stopPropagation();
    handleFilterInput({
      target: { name: key, value: "" },
    });
    setOpenFilter({});
  };

  /*********************
   *
   *  Funciones.
   *
   ********************/

  //funcion encargada de manejar el header de la tabla.
  const CrearThead = () => (
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
                <span className="">{key}</span>
                <br />
                <span className="mx-1 badge">
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
                    filterInputs[key] !== undefined && filterInputs[key] !== ""
                      ? "bg-primary"
                      : ""
                  } rounded px-2 badge  text-center align-self-end p-relative`}
                  onClick={handleFilterClick(key)}
                >
                  <span style={{ cursor: "pointer" }}>
                    <FaFilter />
                  </span>
                  {/* DropDown */}
                  <ul
                    onClick={(e) => e.stopPropagation()}
                    className={`${
                      !openFilter[key] ? "d-none" : ""
                    } position-absolute bg-light text-dark list-group  mt-2 shadow`}
                    style={{
                      transform: "translateX(-50%)",
                      zIndex: "1000",
                    }}
                  >
                    <li className="list-group-item py-1 pt-2 border border-white bg-dark text-white  text-center">
                      <h6>Filtro {key}</h6>
                    </li>
                    {/* Input */}
                    <li className="list-group-item">
                      <div className="form-group card-body py-1 px-1 m-1 d-flex justify-content-center align-items-center">
                        <div className="form-group">
                          <FilterInputs
                            campo={key}
                            data={data}
                            filterInputs={filterInputs}
                            handleFilterInput={handleFilterInput}
                          />
                          <small className="form-text text-danger">
                            {filterError ? "No se hallaron coincidencias." : ""}
                          </small>
                        </div>
                        {/* fin Input */}
                        {/* Botones del Input */}
                        <div className="form-group align-self-start">
                          <label
                            onClick={handleFilterCancel({})}
                            className=" px-2 h6 "
                            style={{ cursor: "pointer" }}
                          >
                            <FaCheckCircle className="text-black rounded-circle text-center" />
                          </label>
                          <label
                            onClick={handleFilterCancel(key)}
                            className=" h6 "
                            style={{ cursor: "pointer" }}
                          >
                            <FaWindowClose className="text-black rounded-circle text-center" />
                          </label>
                          {/* fin Botones del Input */}
                        </div>
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
  );

  //funcion encargada de manejar el cuerpo de la tabla.
  const CrearTbody = () => (
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
  );

  return (
    <div className="table-responsive-md">
      <table className="table shadow table-bordered table-striped  table-hover rounded ">
        {CrearThead()}
        {CrearTbody()}
      </table>
    </div>
  );
};
Tabla.defaultProps = {
  data: [{}],
};

export default Tabla;
