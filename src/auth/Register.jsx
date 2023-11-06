import React, { useState } from 'react';

function Register(props) {
    const [message, setMessage]=useState("");
    const [formData, setFormData]=useState();
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        //fetch
        const config = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }
        const response = await fetch(`http://localhost:5000/users`, config);
        console.log(response);
        if(response.status === 201){
            setMessage("Registered Successfully");
        }else{
            setMessage("something went wrong");
        }
    }

    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type="text" className='form-control' name='name' onChange={handleChange} />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="email" className='form-control' name='email' onChange={handleChange}/>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" className='form-control' name='password' onChange={handleChange}/>
            </div>
            {message}
            <button className='btn btn-primary' onClick={submitForm}>Register</button>
        </form>
        );
}

export default Register;