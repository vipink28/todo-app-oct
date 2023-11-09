import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../helper/endpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage]=useState("");
    const baseUrl = "http://localhost:5000";

    const navigate = useNavigate();


    //login user

    const login =async(formData)=>{
        const response = await fetch(`${baseUrl}/${endpoints.users}?email=${formData.email}&password=${formData.password}`, {method:"GET"});
        const users = await response.json();
        if(users.length > 0){
            setMessage("Logged in successfully");
            localStorage.setItem("todoUser", JSON.stringify(users[0]));
            setUser(users[0]);
            navigate("/task-list");
        }else{
            setMessage("Email/Password incorrect");
        }
    }





    //check user from localstorage
    const getLocalUser = () => {
        let local = localStorage.getItem("todoUser");
        let userData = JSON.parse(local);
        setUser(userData);
    }

    useEffect(() => {
        getLocalUser();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            login,
            message,
            setMessage
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;