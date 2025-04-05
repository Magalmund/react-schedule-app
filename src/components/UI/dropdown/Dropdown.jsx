import React from 'react';
import classes from './Dropdown.module.css'

const Dropdown = ({children, data, selectedOption, setSelectedOption, setSelectedId}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const dataArray = data ? data : []

    const handleOptionClick = ({option}) => {
        // console.log(option)
        setSelectedOption(option.name);
        setSelectedId(option._id)
        setIsOpen(false);
    }

    return (
        <div className={classes.dropDownWrapper}>
            <div onClick={() => setIsOpen((open) => !open)} className={classes.dropDownBtn + " " + (isOpen ? classes.clicked : "")}>
                {selectedOption || "Select"}
            </div>
            <ul className={classes.dropDownMenu + " " + (isOpen ? classes.open : "")}>
                {dataArray.map((option) => (
                    <li
                        key={option._id}
                        className={classes.option}
                        onClick={() => handleOptionClick({option})}
                    >
                        {option.name}
                    </li>
                //     <span
                //         key={item._id}
                //         onClick={() => setTitle(item.name)}
                //         className={classes.option}
                //     >
                //     {item.name}
                // </span>
                ))}
            </ul>

        </div>
    );
};

export default Dropdown;
