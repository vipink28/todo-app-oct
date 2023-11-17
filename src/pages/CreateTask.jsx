import React, { useContext, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskContext from '../context/TaskContext';
import { formatDate } from '../helper';

function CreateTask(props) {
    const { latestTask, recentTasks } = useContext(TaskContext);
    const [isUpdate, setIsUpdate] = useState(false);
    const edit = () => {
        setIsUpdate(true);
    }
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center h-100 bg-primary">
                    <TaskForm isUpdate={isUpdate} data={latestTask} />
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-center h-100">
                    <div className="card w-75 bg-primary text-white">
                        <div className="card-body">
                            <div className="d-flex">
                                <h4>New Task</h4>
                                <button className='btn btn-info ms-auto' onClick={edit}>Edit</button>
                            </div>
                            <h5>{latestTask?.title}</h5>
                            <p>{latestTask?.description}</p>

                            <div className="d-flex text-warning align-items-center">
                                <p className='mb-0'>Modified On: {formatDate(latestTask?.modifiedOn)}</p>
                                <p className='mb-0 ms-auto'>Due On: {formatDate(latestTask?.duedate)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;