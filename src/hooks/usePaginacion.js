import { useEffect, useState } from "react";
import { obtenerInicioyFin } from "../utiles";

/**
 *
 * @param {number} itemsPorPagina
 * @param {[{}]} data
 * hook que controla la logica de la paginación retorna
 * {dataPaginada, paginaActual, handlePaginacion, setPaginaActual}
 */
const usePaginacion = (itemsPorPagina, data) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [dataPaginada, setDataPaginada] = useState([{}]);

  useEffect(() => {
    let [inicio, fin] = obtenerInicioyFin(paginaActual, itemsPorPagina);
    setDataPaginada(data.slice(inicio, fin));
  }, [paginaActual, data, itemsPorPagina]);

  const handlePaginacion = (pagina) => (e) => {
    setPaginaActual(pagina);
  };

  return { dataPaginada, paginaActual, handlePaginacion, setPaginaActual };
};

export default usePaginacion;
