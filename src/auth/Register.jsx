import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from './AuthContext';

function Register(props) {
    const { register, message, setMessage } = useContext(AuthContext);
    const [formData, setFormData] = useState([]);
    const inputField = useRef(null);

    // errors and dirty states to manage error messages and input
    const [errors, setErrors] = useState({
        email: [],
        name: [],
        password: []
    });

    const [dirty, setDirty] = useState({
        email: false,
        name: false,
        password: false
    });

    // function for validating the inputs
    const validate = () => {
        let errorsData = {};
        errorsData.email = [];
        errorsData.password = [];
        errorsData.name = [];

        //email
        if (!formData.email) {
            errorsData.email.push("Please provide email");
        }
        let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        if (formData.email) {
            if (!emailreg.test(formData.email)) {
                errorsData.email.push("Please enter valid email")
            }
        }

        //name
        if (!formData.name) {
            errorsData.name.push("Please provide name");
        }

        //password
        if (!formData.password) {
            errorsData.password.push("Please provide password");
        }
        setErrors(errorsData);
    }

    useEffect(validate, [formData]);

    const isValid = () => {
        let valid = true;
        for (let control in errors) {
            if (errors[control].length > 0) {
                valid = false;
            }
        }
        return valid;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onblurHandle = (e) => {
        const { name } = e.target;
        setDirty((dirty) => ({
            ...dirty,
            [name]: true
        }))
        validate();
    }

    const submitForm = (e) => {
        e.preventDefault();
        debugger
        if (isValid()) {
            register(formData);
        } else {
            const currValue = inputField.current.value;
            if (!currValue) {
                Object.keys(dirty).forEach((abc) => dirty[abc] = true)
            }
            setMessage("Please resolve errors in the form");
        }
    }




    useEffect(() => {
        setMessage("");
    }, [])



    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input ref={inputField} type="text" className='form-control' name='name' onChange={handleChange} onBlur={onblurHandle} />
                <div className='text-danger'>{dirty["name"] && errors["name"][0] ? errors["name"] : ""}</div>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input ref={inputField} type="email" className='form-control' name='email' onChange={handleChange} onBlur={onblurHandle} />
                <div className='text-danger'>{dirty["email"] && errors["email"][0] ? errors["email"] : ""}</div>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input ref={inputField} type="password" className='form-control' name='password' onChange={handleChange} onBlur={onblurHandle} />
                <div className='text-danger'>{dirty["password"] && errors["password"][0] ? errors["password"] : ""}</div>
            </div>
            {message}
            <button className='btn btn-primary' onClick={submitForm}>Register</button>
        </form>
    );
}

export default Register;