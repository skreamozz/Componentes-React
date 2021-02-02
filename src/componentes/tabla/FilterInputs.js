const FilterInputs = ({ campo, data, filterInputs, handleFilterInput }) => {
  let Input;

  switch (typeof data[0][campo]) {
    case "number":
      Input = (
        <input
          name={campo}
          type="number"
          className="form-control-sm"
          value={filterInputs[campo] || ""}
          onChange={handleFilterInput}
          placeholder="Seleccione un N°"
        />
      );
      break;
    case "boolean":
      Input = (
        <div className="form-check form-check-inline">
          <input
            name={campo}
            type="checkbox"
            className="form-check-input position-static"
            onChange={handleFilterInput}
            value={filterInputs[campo] || false}
          />
        </div>
      );
      break;
    default:
      Input = (
        <input
          name={campo}
          value={filterInputs[campo] || ""}
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

export default FilterInputs;
