import { useEffect, useState } from "react";
import { Paginacion, Tabla, Modal } from "../../componentes";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";

//funcion útil para obtener el offset de la páginacion.
const obtenerInicioyFin = (actual, cantidadAmostrar) => {
  let inicio = (actual - 1) * cantidadAmostrar;
  let fin = inicio + cantidadAmostrar;
  return [inicio, fin];
};

const claseSeleccion = "table-primary";

/**
 *
 * @param {{
 *  titulo:string,
 *  urls:string,
 *  camposOcultos:string[],
 *  itemsPorPagina:number
 * }} props
 *
 *
 */
const Abm = ({ titulo, urls, camposOcultos, itemsPorPagina = 10 }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [dataPaginada, setDataPaginada] = useState([{}]);

  const [data, setData] = useState([{}]);
  const [selectedRow, setSelectedRow] = useState();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalForm, setModalForm] = useState();

  //efecto que se encarga de hacer fetch a la api para traer
  //todos los datos del abm
  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(urls);
        const datos = await result.json();
        if (Array.isArray(datos)) {
          setData(datos);
        }
      } catch (err) {
        setData([{}]);
      }
    })();
  }, [urls]);

  //efecto que se encarga de obtener la pagina correspondiente de la tabla
  useEffect(() => {
    let [inicio, fin] = obtenerInicioyFin(paginaActual, itemsPorPagina);
    if (Array.isArray(data)) {
      let datosTemp = data.slice(inicio, fin);
      setDataPaginada(datosTemp);
    }
  }, [data, paginaActual, itemsPorPagina]);

  //evento correspondiente a cliquear una fila
  const onRowClick = (row) => (e) => {
    const { parentNode } = e.target;
    if (parentNode.classList.contains(claseSeleccion)) {
      parentNode.classList.toggle(claseSeleccion);
      setSelectedRow(undefined);
      return;
    }

    if (selectedRow) selectedRow.el.classList.toggle(claseSeleccion);
    parentNode.classList.toggle(claseSeleccion);
    setSelectedRow({ row, el: parentNode });
  };

  const handleClick = (accion) => (e) => {
    if (data.length <= 0) return;
    let campos = Object.keys(data[0]).filter(
      (key) => !camposOcultos.includes(key)
    );
    let types = [
      ...campos.map((campo) => {
        switch (typeof data[0][campo]) {
          case "boolean":
            return "checkbox";
          case "number":
            return "number";
          default:
            return "text";
        }
      }),
    ];
    let FormBase = <form></form>;
    switch (accion) {
      case "nuevo":
        if (selectedRow) {
          selectedRow.el.classList.toggle(claseSeleccion);
          setSelectedRow(undefined);
        }
        FormBase = (
          <form onSubmit={(e) => e.preventDefault()} className="card-body">
            {campos.map((campo, index) => (
              <div key={campo} className="form-group">
                <label>{campo}</label>
                <input
                  name={campo}
                  className="form-control"
                  type={types[index]}
                />
              </div>
            ))}
            <button className="btn btn-primary btn-block">Enviar</button>
          </form>
        );

        break;
      case "modificar":
        FormBase = (
          <form onSubmit={(e) => e.preventDefault()} className="card-body">
            {campos.map((campo, index) => (
              <div key={campo} className="form-group">
                <label>{campo}</label>

                <input
                  name={campo}
                  defaultValue={selectedRow.row[campo]}
                  defaultChecked={selectedRow.row[campo]}
                  className="form-control"
                  type={types[index]}
                />
              </div>
            ))}
            <button className="btn btn-warning btn-block">Modificar</button>
          </form>
        );

        break;
      case "eliminar":
        FormBase = (
          <form onSubmit={(e) => e.preventDefault()} className="card-body">
            <h3>Se va a eliminar...</h3>
            {campos.map((campo, index) => (
              <div key={campo} className="form-group">
                <label>{campo}</label>
                <input
                  name={campo}
                  value={selectedRow.row[campo]}
                  checked={selectedRow.row[campo]}
                  className="form-control"
                  disabled={true}
                  type={types[index]}
                />
              </div>
            ))}
            <button className="btn btn-block btn-danger">Eliminar</button>
          </form>
        );

        break;
      default:
        break;
    }
    setModalForm(FormBase);
    setIsOpenModal(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center p-4">
        <h3 className="display-3 ">
          <u>{titulo}</u>
        </h3>
      </div>
      <div className="row justify-content-center">
        <div className="col">
          <Paginacion
            cantidadItems={data.length}
            paginaActual={paginaActual}
            elementosAMostrar={itemsPorPagina}
            handlePaginacion={(pagina) => (e) => {
              setPaginaActual(pagina);
              if (selectedRow) {
                selectedRow.el.classList.toggle(claseSeleccion);
                setSelectedRow(undefined);
              }
            }}
          >
            <Tabla
              data={dataPaginada}
              onRowClick={onRowClick}
              camposOcultos={camposOcultos}
            />
          </Paginacion>
        </div>
        <div className="col-4 col-md-3 d-flex flex-column justify-content-center">
          <button
            onClick={handleClick("nuevo")}
            className="btn btn-outline-primary"
          >
            Nuevo <br /> <BsFillPlusCircleFill />
          </button>
          <button
            onClick={handleClick("modificar")}
            className="btn my-2 btn-outline-warning"
            disabled={!selectedRow}
          >
            Modificar <br /> <FaPencilAlt />
          </button>
          <button
            onClick={handleClick("eliminar")}
            className="btn btn-outline-danger"
            disabled={!selectedRow}
          >
            Eliminar <br /> <FaTrashAlt />
          </button>
        </div>
      </div>
      <Modal
        status={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false);
          setModalForm(undefined);
        }}
      >
        {modalForm}
      </Modal>
    </div>
  );
};

export default Abm;
