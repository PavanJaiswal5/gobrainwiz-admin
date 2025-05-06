import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
function AdminLayout() {
    return (
        <>
            <div className="md:pl-[70px] md:[&:has([data-layout='sidebar'].classic)]:!pl-[300px] transition-all duration-300 ease-out">
                <Sidebar />
                <div className="flex flex-col">
                    <Header />
                    <div className="p-[20px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminLayout