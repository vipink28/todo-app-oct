import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import TaskContext from '../context/TaskContext';

function TaskForm(props) {
    const init = {
        title: "",
        description: "",
        duedate: ""
    }

    const [formData, setFormData] = useState(null);
    const { message, user } = useContext(AuthContext);
    const { saveTask } = useContext(TaskContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (user) {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                userId: user.id,
                modifiedOn: Date()
            }))
        }
    }



    const onCreate = (e) => {
        e.preventDefault();
        saveTask(formData);
    }

    return (
        <div className='w-50'>
            <h3 className='text-white'>Create Task</h3>

            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className='form-label'>Title</label>
                            <input type="text" className='form-control' name='title' onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' name="description" onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Date</label>
                            <input type="datetime-local" className='form-control' name='duedate' onChange={handleChange} />
                        </div>

                        <p className='mb-2'>{message}</p>
                        <button className='btn btn-primary' onClick={onCreate}>Create Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;