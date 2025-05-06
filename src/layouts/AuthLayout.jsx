import React from 'react'
import { Outlet } from 'react-router'

function AuthLayout() {
    return (

        <div className="bg-cover bg-right-top	bg-[url(https://images.unsplash.com/photo-1634655377962-e6e7b446e7e9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen flex justify-end">
            <div className="flex-none w-[500px] max-w-full shadow-[-5px_0_20px] shadow-black/5 backdrop-blur-lg bg-gradient-to-tr from-white/90 to-white/30 flex flex-col justify-center py-[40px] px-[20px] lg:p-[40px]">
                <div className="w-[350px] max-w-full mx-auto">
                    <a href="index.html"><img src={`${import.meta.env.BASE_URL}/images/logo.svg`} className="h-[30px] max-w-full mb-[20px]" /></a>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default AuthLayout