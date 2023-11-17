import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";
const TaskContext = createContext();
export const TaskProvider=({children})=>{
    const {setMessage, user} = useContext(AuthContext);
    const [allTasks, setAllTasks] = useState(null);
    const [latestTask, setLatestTask] = useState(null);
    const [recentTasks, setRecentTasks] = useState(null);
    const [isCreated, setIsCreated] = useState(false);

    //create task
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
            setIsCreated(true);
        }else{
            setMessage("Something went wrong");
        }
    }


    // get all tasks
    const getAllTasks = async()=>{
        const response = await fetch(`http://localhost:5000/tasks?userId=${user.id}`, {method:"GET"});
        if(response.ok){
            const taskList = await response.json();
            setAllTasks(taskList);
            let latest = taskList[taskList.length - 1]
            setLatestTask(latest);
            let recent = taskList.slice(-3);
            setRecentTasks(recent);
        }else{
            console.log("something went wrong");
        }
    }


    useEffect(()=>{
        if(user){
            getAllTasks();
        }        
    }, [user]);


    return (
    <TaskContext.Provider value={{
        saveTask,
        allTasks,
        latestTask,
        recentTasks,
        isCreated
    }}>
        {children}
    </TaskContext.Provider>
    )
}

export default TaskContext;