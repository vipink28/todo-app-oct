import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();

    const [message, setMessage]=useState("");
    const [formData, setFormData]=useState();
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const submitForm =async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, {method:"GET"});
        const users = await response.json();
        if(users.length > 0){
            setMessage("Logged in successfully");
            localStorage.setItem("todoUser", JSON.stringify(users[0]));
            navigate("/task-list");
        }else{
            setMessage("Email/Password incorrect");
        }
    }

    return (
        <form>
            <div className="mb-3">
                <label className='form-label'>Email</label>
                <input type="text" name='email' className='form-control' onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className='form-label'>Password</label>
                <input type="password" name='password' className='form-control' onChange={handleChange} />
            </div>
            {message}
            <button className='btn btn-primary' onClick={submitForm}>Login</button>
        </form>
    );
}

export default Login;