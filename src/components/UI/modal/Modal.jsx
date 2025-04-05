import React from 'react';
import classes from './Modal.module.css';

const Modal = ({modalContent, children, ...props}) => {

    return (
        // <div className="fixed inset-0 flex items-center justify-center bg-[#00000054] bg-opacity-50 z-[10]">
        //     <form className="bg-white rounded-lg shadow-2xl w-1/4 overflow-hidden">
        //
        //     </form>
        // </div>
    <div className={classes.modal}>
        <div className={`${classes.modalDialog} w-1/4`}>
            <form className={classes.modalContent + " " + `${modalContent}`}>
                {children}
            </form>
        </div>
    </div>
    )
        ;
};

export default Modal;
