import React, { useEffect, useState } from "react";
import {
  FaSortUp,
  FaSortDown,
  FaSort,
  FaWindowClose,
  FaSearch,
} from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
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
    const { name, value, checked, type } = e.target;

    const filterInputsTemp = {
      ...filterInputs,
      [name]: type === "checkbox" ? checked : value,
    };

    setFilterInputs(filterInputsTemp);
    setSortUp({});
    if (!onFilter(filterInputsTemp)) {
      setFilterError(true);
      return;
    }

    setFilterError(undefined);
  };

  const handleFilterCancel = (key) => (e) => {
    e.stopPropagation();
    handleFilterInput({
      target: { name: key, value: "" },
    });
    setOpenFilter({});
  };

  /**
   *
   *  Funciones
   *
   */

  //funcion encargada de dibujar los inputs del filtro, correspondiente al tipo de dato.
  const CrearInputs = (key) => {
    let Input;

    switch (typeof data[0][key]) {
      case "number":
        Input = (
          <input
            name={key}
            type="number"
            className="form-control-sm"
            value={filterInputs[key] || ""}
            onChange={handleFilterInput}
            placeholder="Seleccione un N°"
          />
        );
        break;
      case "boolean":
        Input = (
          <div className="form-check form-check-inline">
            <input
              name={key}
              type="checkbox"
              className="form-check-input position-static"
              onChange={handleFilterInput}
              value={filterInputs[key] || false}
            />
          </div>
        );
        break;
      default:
        Input = (
          <input
            name={key}
            value={filterInputs[key] || ""}
            type="text"
            className="form-control-sm"
            onChange={handleFilterInput}
            placeholder="Ingrese un valor..."
          />
        );
        break;
    }
    return Input;
  };

  return (
    //empezamos con una tabla html tipica, con algunaas clases de bootstrap basicas para darle forma
    <div className="table-responsive-md">
      <table className="table shadow table-bordered table-striped  table-hover rounded ">
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
                        filterInputs[key] !== undefined &&
                        filterInputs[key] !== ""
                          ? "bg-primary"
                          : ""
                      } rounded px-2 badge  text-center align-self-end p-relative`}
                      onClick={handleFilterClick(key)}
                    >
                      <span style={{ cursor: "pointer" }}>
                        <FaSearch />
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
                        <li className="list-group-item p-1 m-1 bg-dark text-white ">
                          <h6>Filtro {key}</h6>
                        </li>
                        {/* Input */}
                        <li className="list-group-item">
                          <div className="form-group card-body py-1 px-1 m-1 d-flex justify-content-center align-items-center">
                            <div className="form-group">
                              {CrearInputs(key)}
                              <small className="form-text text-danger">
                                {filterError
                                  ? "No se hallaron coincidencias."
                                  : ""}
                              </small>
                            </div>
                            {/* fin Input */}
                            {/* Botones del Input */}
                            <div className="form-group  align-self-start">
                              <label
                                onClick={handleFilterCancel({})}
                                className=" px-2 h6 text-center"
                                style={{ cursor: "pointer" }}
                              >
                                <GrStatusGood className="text-black rounded-circle text-center" />
                              </label>
                            </div>
                            <div className="form-group align-self-start">
                              <label
                                onClick={handleFilterCancel(key)}
                                className=" h6 text-center"
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
