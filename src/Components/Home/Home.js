import React from 'react';
import UseAuth from '../../Hooks/useAuth';
import ToDo from '../ToDO/ToDo';

const Home = () => {
    const {logOut, user} = UseAuth();
    return (
        <div>
            <h2>Home</h2>
            <p>{user.email}</p>
            <p>{user.displayName}</p>

            {user.email && <button onClick={logOut} >Logout</button>}
            <ToDo></ToDo>
        </div>
    );
};

export default Home;