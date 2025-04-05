import React from 'react';
import classes from './Input.module.css';

const Input = ({customClass, ...props}) => {
    return (
        <input {...props} className={classes.input + " " + customClass}>

        </input>
    );
};

export default Input;
