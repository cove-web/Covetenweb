import React from 'react';
import Main from './Main';

const CreateLead = () => {
    return (
        <div className=' bg-transprent p-3 lg:p-6'         style={{backgroundColor:'rgba(232, 232, 232, 0.5)'}}
        >
            <h4 className='mb-6 font-semibold text-3xl '>Create Lead</h4>
            <Main />
        </div>
    );
};

export default CreateLead;