import { BsList, BsSearch } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./SlideMenu.css";
import { useState } from "react";
const SlideMenu = ({ Items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`slide ${isOpen ? "openSlide" : "closeSlide"}`}>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="Bread" onClick={handleClick}>
          <AiOutlineMenu />
        </div>
      </IconContext.Provider>
      <ul>
        {Items?.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SlideMenu;
