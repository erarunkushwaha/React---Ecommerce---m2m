import React from 'react'
import { useSelector } from 'react-redux';

const Login = () => {
    const { user } = useSelector((state) => ({ ...state }));
  

    return (
        <div>
           i am logn {user && (user.email)}
        </div>
    )
}

export default Login
