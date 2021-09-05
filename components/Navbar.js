import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../scss/main.scss';
import { IconContext } from 'react-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faWindowClose } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FontAwesomeIcon icon={faBars} onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <FontAwesomeIcon icon={faWindowClose} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {/* <span className="logout">
              <FontAwesomeIcon
                icon={faUserTimes}
                onClick={() => handleLegout()}
              />
              Wyloguj się
            </span> */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
