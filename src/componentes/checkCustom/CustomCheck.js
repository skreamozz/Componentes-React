import "./CustomCheck.css";

const CustomCheck = ({ checked, name, onChange }) => {
  return (
    <label className="switch form-control">
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default CustomCheck;
