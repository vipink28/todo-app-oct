import { createContext, useContext } from "react";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();


export const TaskProvider=({children})=>{
    const {setMessage} = useContext(AuthContext);

    const saveTask = async(formData)=>{
        const config = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        }
        const response = await fetch(`http://localhost:5000/tasks`, config);
        if(response.status === 201){
            setMessage("Task created successfully");
        }else{
            setMessage("Something went wrong");
        }
    }

    return (
    <TaskContext.Provider value={{
        saveTask
    }}>
        {children}
    </TaskContext.Provider>
    )
}

export default TaskContext;