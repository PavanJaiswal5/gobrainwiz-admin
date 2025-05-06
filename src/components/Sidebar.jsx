import React, { useContext, useState } from 'react'
import data from '../Data'
import { Config } from './ConfigProvider';
import { NavLink, useParams } from 'react-router';



const Recursive = ({ items,active }) => {
    const params = useParams()
    const [openNodeId, setOpenNodeId] = useState(null);
    const handleToggle = (id) => {
      setOpenNodeId(prev => (prev === id ? null : id));
    };
    return (
    <ul className={`${active && 'active'}`}>
        {items.map((item, i) =>
            <li key={i}>
                {item.children ? 
                <>
                <a  onClick={(e) => {e.preventDefault();  handleToggle(item.id) }}>
                    {item.icon && <i className={item.icon}></i>}
                    <span>{item.label}</span>
                    </a>
                </> : 
                <>
                <NavLink to={item.endpoint} className={({ isActive }) => isActive ? "active" : ''}  onClick={(e) => {  handleToggle(item.id) }}>
                    {item.icon && <i className={item.icon}></i>}
                    <span>{item.label}</span>
                    </NavLink>
                </>
                }
                
                {item.children && <Recursive items={item.children} active={openNodeId === item.id} />}
            </li>
        )}
    </ul>
    )
}
function Sidebar() {
    const { sidebar, setSidebar } = useContext(Config);
    return (
        <>
            <div data-layout="sidebar" className={`${sidebar ? 'classic' : 'compact'}`}>
                <div>
                    <a data-layout="logo">
                        <img src={`${import.meta.env.BASE_URL}/images/logo.svg`} alt="logo" />
                        <button type="button" className="btn btn-icon" data-layout="sidebar-toggle" onClick={()=>setSidebar(false)}><i className="fi fi-rr-cross"></i></button>
                    </a>
                    <div data-layout="menu"><Recursive items={data.menu} /></div>
                </div>
            </div>
            <div data-layout="sidebar-backdrop" onClick={()=>setSidebar(false)}></div>
        </>
    )
}
export default Sidebar