import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Config } from './ConfigProvider';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
function Header() { 
    const navigate = useNavigate();
    const { sidebar,setSidebar,BwSwal} = useContext(Config);
    return (
        <>
            <div className="flex items-center h-[62px] px-[15px] bg-white border-b border-gray-200 sticky top-0 z-[9]">
                <button type="button" className="btn btn-icon" data-layout="sidebar-toggle" onClick={()=>setSidebar(val=>!val)}><i className="fi fi-rr-sidebar text-[20px]"></i></button>
                <Dropdown className="ml-auto">
                    <Dropdown.Toggle variant="link" bsPrefix=" " className="!border-gray-300 py-0 h-[40px] !flex items-center !no-underline !text-gray-500 gap-[5px]">
                        <i className="fi fi-sr-circle-user text-[24px] text-gray-500"></i>
                        <span className="align-middle">Admin</span>
                        <i className="fi fi-sr-angle-small-down"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bw-dropdown">
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>Change Password</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>{
                               BwSwal.fire({
                                text: `Are you sure you want to logout`,
                                showCancelButton: true,
                                confirmButtonText: "Yes",
                                confirmButtonColor: "var(--bw-primary)",
                                cancelButtonText: "No",
                                icon: 'warning',
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    toast.success("Logout Successfully!")
                                   navigate("/")
                                }
                              }); 
                        }}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    )
}
export default Header