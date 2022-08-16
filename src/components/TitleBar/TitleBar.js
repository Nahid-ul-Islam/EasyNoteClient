import React from 'react';
import './TitleBar.css';

const TitleBar = ({ title, children }) => {
    return (
        <div className='container mx-auto h-screen mt-5'>
            <div>
                {
                    title &&
                    <>
                        <h1 className='text-2xl mx-2 md:text-4xl md:mx-5 lg:text-5xl text-black heading'>{title}</h1>
                        <div className='bg-gray-300 h-[1px] mt-2'></div>
                    </>
                }
                <div className='mx-2 md:mx-5'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TitleBar;