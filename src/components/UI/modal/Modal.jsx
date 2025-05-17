import React, {useCallback, useEffect} from 'react';
import classes from './Modal.module.css';

const Modal = ({children, setShowModal, onSubmit, ...props}) => {

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            setShowModal(false);
        }
    }, [setShowModal]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className={classes.modal}
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`${classes.modalDialog}`}
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    className={classes.modalContent}
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(e);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.stopPropagation();
                        }
                    }}
                >
                    {children}
                </form>
            </div>
        </div>
    )
        ;
};

export default Modal;
