import React from 'react';
import classes from './Button.module.css'

const Button = ({children, customClass, ...props}) => {

    return (
        <button {...props} className={`${classes.btn} ${classes.btnPrimary} ${customClass}`}>
            {children}
        </button>
    );
};

export default Button;
