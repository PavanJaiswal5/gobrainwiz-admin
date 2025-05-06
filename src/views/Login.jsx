import React from 'react'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
function Login() {
    return (
        <>
            <div className="floating-label mb-[20px]">
                <input type="email" className="form-control bw-form-control" id="username" placeholder=" " />
                <label htmlFor="username">Username</label>
            </div>
            <div className="floating-label mb-[20px]">
                <input type="password" className="form-control bw-form-control" id="password" placeholder=" " />
                <label htmlFor="password">Password</label>
            </div>
            <div className="flex flex-col gap-[10px]">
                <Link to="/account" onClick={()=> toast.success("Login Successfully!")} className="btn btn-primary bw-btn self-start">Sign In <i className="fi fi-rr-angle-right"></i></Link>
            </div>
        </>
    )
}
export default Login