import React from 'react';
import classes from './Switch.module.css'

const Switch = ({checked, onChange, color, children, ...props}) => {

    return (
        <label {...props} className={`${classes.label}`}>
            <div className={classes.toggle}>
                <input className={classes.toggleState} type="checkbox" onChange={onChange} checked={checked}/>
                <div
                    style={checked ? {backgroundColor: `var(--color-${color}-400)`} : {backgroundColor: "#b1bcce"}}
                    className={`${classes.indicator}`}></div>
                {children}
            </div>
        </label>
    );
};

export default Switch;
