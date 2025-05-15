import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Config } from './ConfigProvider';
import { useNavigate } from 'react-router-dom'; // Correct import
import { toast } from 'react-toastify';
import { userAuthApi } from "../services/api/userAuth.api";

function Header() { 
    const navigate = useNavigate(); // Use useNavigate hook
    const { setSidebar, BwSwal } = useContext(Config);

    const logout = async () => {
        try {
            const res = await userAuthApi.logout(); 
            console.log("Response from logout API:", res);

            if (res.status === 200) {
                console.log("Logout successful");
                localStorage.clear(); // Clear local storage

                // Navigate to the home page after successful logout
                toast.success("Logout Successfully!");
                navigate("/"); // Use navigate after successful logout
            } else {
                console.log("Logout failed");
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <div className="flex items-center h-[62px] px-[15px] bg-white border-b border-gray-200 sticky top-0 z-[9]">
                <button 
                    type="button" 
                    className="btn btn-icon" 
                    data-layout="sidebar-toggle" 
                    onClick={() => setSidebar(val => !val)}
                >
                    <i className="fi fi-rr-sidebar text-[20px]"></i>
                </button>
                
                <Dropdown className="ml-auto">
                    <Dropdown.Toggle 
                        variant="link" 
                        bsPrefix=" " 
                        className="!border-gray-300 py-0 h-[40px] !flex items-center !no-underline !text-gray-500 gap-[5px]"
                    >
                        <i className="fi fi-sr-circle-user text-[24px] text-gray-500"></i>
                        <span className="align-middle">Admin</span>
                        <i className="fi fi-sr-angle-small-down"></i>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu className="bw-dropdown">
                        <Dropdown.Item>Change Password</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {
                            BwSwal.fire({
                                text: `Are you sure you want to logout?`,
                                showCancelButton: true,
                                confirmButtonText: "Yes",
                                confirmButtonColor: "var(--bw-primary)",
                                cancelButtonText: "No",
                                icon: 'warning',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    logout(); // Call the logout function if confirmed
                                }
                            });
                        }}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
}

export default Header;
