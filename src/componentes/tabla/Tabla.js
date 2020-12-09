import React from "react";

const Tabla = ({ data }) => {
  return (
    <table className="table table-dark table-bordered table-responsive-md table-hover">
      <thead className="bg-info">
        <tr>
          {Object.keys(data[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map((key, index) => (
              <td key={index}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
