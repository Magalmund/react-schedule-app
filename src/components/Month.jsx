import React from 'react';
import Day from "./Day.jsx";
import Card from "./UI/card/Card.jsx";


const Month = ({month}) => {
    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-2">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                            <Day key={idx} day={day} rowIdx={i}/>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Month;
