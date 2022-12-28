import React from 'react';
import { NavLink } from 'react-router-dom';

function Default(props) {
    return (
        <div>
            <h1> <strong> 404 </strong> Page Not Found </h1>
            <NavLink to={"/"}> <button> Home Page </button> </NavLink>
        </div>
    );
}

export default Default;