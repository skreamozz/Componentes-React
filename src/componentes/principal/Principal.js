import React, { useState } from "react";

const Principal = ({ children /** props.children */ }) => {
  const [state, setState] = useState(0);

  return (
    <div className="row justify-content-center">
      <button
        onClick={() => {
          setState(state + 1);
        }}
      ></button>
      {state}
    </div>
  );
};

export default Principal;
