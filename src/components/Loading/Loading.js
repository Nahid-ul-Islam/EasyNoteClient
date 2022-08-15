import React from 'react';

const Loading = () => {
    return (
        <div className='my-10 h-screen'>
            <div className="flex justify-center items-center">
                < div className="animate-spin rounded-full h-16 w-16 lg:h-32 lg:w-32 border-b-2 border-black"></div>
            </div>
            <h4 className='text-center text-xl fond-semibold text-black mt-5'>Loading...</h4>
        </div>
    );
};

export default Loading;