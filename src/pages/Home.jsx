import React from 'react';
import illustration from '../assets/illustration.png';

function Home(props) {
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center h-100 bg-primary">
                    <h1 className='title display-4 text-white text-center'>
                        An App to <br />
                        make your life <br />
                        <span className='display-1'>Easy</span>
                    </h1>
                    <img className='img-fluid mt-3' src={illustration} alt="illustration" />
                </div>


                <div className="col-lg-6 d-flex align-items-center justify-content-center h-100">

                    <div className="card">
                        <div className="card-header">
                            
                        </div>
                        <div className="card-body">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;