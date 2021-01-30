import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import "./SlideMenu.css";

/**
 *
 * @param {[{to:string,icono:Icon, texto:string}]} param0
 *
 * @arugments to: ruta a la que se va a dirigir el Link
 * @arugments icono: icono que se va a mostrar en el elemento
 * @arguments texto: label que va a tener el elemento
 */
const SlideMenu = ({ Items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ItemState, setItemState] = useState([]);

  useEffect(() => {
    setItemState(
      Items.map((item) => {
        if (item?.sub) {
          item.sub.open = false;
        }
        return item;
      })
    );
  }, [Items]);

  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  const handleSubMenu = (Itemindex) => (e) => {
    let itemStateTemp = ItemState.map((item, index) => {
      if (index === Itemindex) {
        item.sub.open = !item.sub.open;
      } else if (item?.sub) {
        item.sub.open = false;
      }
      return item;
    });
    setItemState(itemStateTemp);
  };
  return (
    <div className={`slide  ${isOpen ? "openSlide" : "closeSlide"}`}>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="Bread" onClick={handleClick}>
          <AiOutlineMenu />
        </div>
      </IconContext.Provider>
      <ul>
        {ItemState?.map((item, index) => (
          <div key={index}>
            <li onClick={item.to ? () => {} : handleSubMenu(index)}>
              <Link className="link" to={item?.to || "#"}>
                {item.icono} {item.texto}
              </Link>
            </li>
            {item.sub ? (
              <ul
                className={`submenu  ${item.sub.open ? "Open" : "Close"}`}
                id={index}
              >
                {item.sub?.map((sub, index) => (
                  <li key={index} className="submenu-item">
                    <Link to={sub.to} className="link">
                      {sub.icono}
                      {sub.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SlideMenu;
