/**
 * funcion encargada de obtener el rango de la paginacion
 * @param {number} actual pagina que se va a mostrar.
 * @param {number} cantidadAmostrar cantidad de campos que va a tener la pagina.
 *
 */
const obtenerInicioyFin = (actual, cantidadAmostrar) => {
  let inicio = (actual - 1) * cantidadAmostrar;
  let fin = inicio + cantidadAmostrar;
  return [inicio, fin];
};

export { obtenerInicioyFin };
