import React, { useState } from 'react';
import TaskForm from './TaskForm';
import { formatDate } from '../helper';

function Popup(props) {
    // const [data, setData] = useState();
    const { actionType, data } = props;
    console.log(data);

    return (

        <div className="modal-content bg-primary text-white">
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {
                    actionType === "view" ?
                        <div>
                            <h5>{data?.title}</h5>
                            <p>{data?.description}</p>
                            <div className='d-flex text-warning align-items-center'>
                                <p className='mb-0'>Modified On: {formatDate(data?.modifiedOn)}</p>
                                <p className='mb-0 ms-auto'>Due Date: {formatDate(data?.duedate)}</p>
                            </div>
                        </div>
                        : actionType === "edit" ?
                            <TaskForm />
                            :
                            <div>
                                Delete
                            </div>
                }
            </div>
        </div>

    );
}

export default Popup;