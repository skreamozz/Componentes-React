import { useCallback, useEffect, useState } from "react";

const Paginacion = ({
  cantidadItems,
  paginaActual,
  elementosAMostrar,
  children,
  handlePaginacion,
}) => {
  const [cantPaginas, setCantPaginas] = useState(0);
  const [Items, setItems] = useState([]);
  handlePaginacion = useCallback(handlePaginacion, [handlePaginacion]);
  useEffect(() => {
    let paginas = Math.floor(cantidadItems / elementosAMostrar);
    if (paginas * elementosAMostrar < cantidadItems) paginas++;
    setCantPaginas(paginas);
  }, [cantidadItems, elementosAMostrar]);
  useEffect(() => {
    let items = [];
    for (let index = 1; index <= cantPaginas; index++) {
      items.push(
        <li
          key={index}
          className={`page-item ${paginaActual === index && "active"}`}
          onClick={handlePaginacion(index)}
        >
          <span className="page-link user-select-none">{index}</span>
        </li>
      );

      setItems(items);
    }
  }, [cantPaginas, paginaActual, handlePaginacion]);
  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className="page-item" onClick={handlePaginacion(1)}>
          <span className="page-link user-select-none">Primer</span>
        </li>
        {Items}
        <li className="page-item" onClick={handlePaginacion(Items.length)}>
          <span className="page-link user-select-none">Ultimo</span>
        </li>
      </ul>
      {children}
      <ul className="pagination pagination-sm">
        <li className="page-item" onClick={handlePaginacion(1)}>
          <span className="page-link user-select-none">Primer</span>
        </li>
        {Items}
        <li className="page-item" onClick={handlePaginacion(Items.length)}>
          <span className="page-link user-select-none">Ultimo</span>
        </li>
      </ul>
    </div>
  );
};

export default Paginacion;
