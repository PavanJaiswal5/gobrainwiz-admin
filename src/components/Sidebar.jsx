import React, { useContext, useState } from 'react';
import data from '../Data';
import { Config } from './ConfigProvider';
import { NavLink, useParams } from 'react-router-dom'; // make sure it's from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
const Recursive = ({ items, active }) => {
  const [openNodeId, setOpenNodeId] = useState(null);
  const { user } = useAuth();
  const role = user?.role || "user";
  console.log(`hii i am in sidebar and here Role is : ${role}`)
 
  const handleToggle = (id) => {
    setOpenNodeId((prev) => (prev === id ? null : id));
  };

  const filterByRole = (items) =>
    items
      .filter(item => !item.roles || item.roles.includes(role))
      .map(item => ({
        ...item,
        children: item.children ? filterByRole(item.children) : undefined
      }))
      .filter(item => item.children?.length > 0 || !item.children); // Remove empty children

  const filteredItems = filterByRole(items);

  return (
    <ul className={`${active && 'active'}`}>
      {filteredItems.map((item, i) => (
        <li key={i}>
          {item.children ? (
            <>
              <a onClick={(e) => { e.preventDefault(); handleToggle(item.id); }}>
                {item.icon && <i className={item.icon}></i>}
                <span>{item.label}</span>
              </a>
              <Recursive items={item.children} active={openNodeId === item.id} />
            </>
          ) : (
            <NavLink
              to={item.endpoint}
              className={({ isActive }) => isActive ? "active" : ""}
              onClick={() => handleToggle(item.id)}
            >
              {item.icon && <i className={item.icon}></i>}
              <span>{item.label}</span>
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

// 🔥 Sidebar Component Here
const Sidebar = () => {
  const { sidebar, setSidebar } = useContext(Config);

  return (
    <>
      <div data-layout="sidebar" className={`${sidebar ? 'classic' : 'compact'}`}>
        <div>
          <a data-layout="logo">
            <img src={`${import.meta.env.BASE_URL}/images/logo.svg`} alt="logo" />
            <button
              type="button"
              className="btn btn-icon"
              data-layout="sidebar-toggle"
              onClick={() => setSidebar(false)}
            >
              <i className="fi fi-rr-cross"></i>
            </button>
          </a>
          <div data-layout="menu">
            <Recursive items={data.menu} />
          </div>
        </div>
      </div>
      <div data-layout="sidebar-backdrop" onClick={() => setSidebar(false)}></div>
    </>
  );
};

export default Sidebar;
