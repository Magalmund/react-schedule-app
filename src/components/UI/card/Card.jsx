import React from 'react';
import classes from './Card.module.css';

const Card = ({children, ...props}) => {
    return (
        <div {...props} className={classes.card}>
            {children}
        </div>
    );
};

export default Card;
