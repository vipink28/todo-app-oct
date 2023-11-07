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
        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`, {method:"GET"});
        if(checkUser.ok){
            const user = await checkUser.json();
            if(user.length > 0){
                setMessage("user already exist");
            }else{
                const response = await fetch(`http://localhost:5000/users`, config);
                
                if(response.status === 201){
                    const user = await response.json();
                    setMessage("Registered Successfully");
                    localStorage.setItem("todoUser", JSON.stringify(user))                    
                }else{
                    setMessage("something went wrong");
                }
            }
        }else{
            setMessage("something went wrong, please try again")
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