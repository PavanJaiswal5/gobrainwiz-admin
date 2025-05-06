import React, { useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'

function Filters({ children,onReset,onApply }) {
    const [show, setShow] = useState(false);
 
    return (
        <Dropdown align="end" autoClose="outside" show={show} onToggle={()=>setShow(val=>!val)}>
            <Dropdown.Toggle variant="outline-default bw-btn" bsPrefix=" " >Filters <i className="fi fi-rr-settings-sliders"></i></Dropdown.Toggle>
            <Dropdown.Menu className="bw-dropdown bw-dropdown-filter">
                <div className="bw-dropdown-filter-header">
                    <div className="bw-dropdown-filter-title">Filters</div>
                    <Button variant="bw-dropdown-filter-close btn-sm btn-icon" onClick={()=>setShow(false)}><i className="fi fi-sr-cross"></i></Button>
                </div>
                <div className="bw-dropdown-filter-body">
                    {children}
                </div>
                <div className="bw-dropdown-filter-footer">
                    <Button size="sm" variant="" className="bw-btn !mr-auto" onClick={()=>onReset && onReset()}>Reset All</Button>
                    <Button size="sm" variant="outline-default" className="bw-btn" onClick={()=>onApply && onApply()}>Apply</Button>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Filters