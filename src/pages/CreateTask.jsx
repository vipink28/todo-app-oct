import React from 'react';
import TaskForm from '../components/TaskForm';

function CreateTask(props) {
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center h-100 bg-primary">
                    <TaskForm />
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-center h-100">

                </div>
            </div>
        </div>
    );
}

export default CreateTask;