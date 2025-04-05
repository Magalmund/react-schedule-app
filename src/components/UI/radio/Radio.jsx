import React from 'react';
import classes from './Radio.module.css'

const Radio = ({data, selected, setSelected, className}) => {

    const dataArray = data ? data : [];

    return (
        <div className={className}>
            {dataArray.map((item) => (
                <div key={item} className={classes.wrapper}>
                    <div>
                        <input
                            onChange={(e) => setSelected(e.target.value)}
                            value={item}
                            checked={selected === item}
                            id={item}
                            type="radio"
                            className={classes.state}
                        />
                        <label htmlFor={item} className={classes.label}>
                            <div className={classes.indicator}></div>
                            {/*<span className={classes.text}>a) {item}</span>*/}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Radio;
