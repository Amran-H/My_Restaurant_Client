import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const { user } = useAuth();

    return (
        <div className='mt-10 md:mt-0'>
            <h2 className="text-3xl">
                Hi, Welcome<span className='text-yellow-500'> {user?.displayName ? user?.displayName : 'Back'}</span>!
            </h2>
        </div>
    );
};

export default UserHome;