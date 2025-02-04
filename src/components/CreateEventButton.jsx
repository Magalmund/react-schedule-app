import React, {useContext} from 'react';
import plusImg from '../assets/plus.svg';
import GlobalContext from "../context/GlobalContext.jsx";
const CreateEventButton = () => {

    const {setShowEventModal} = useContext(GlobalContext);


    return (
        <button onClick={() => setShowEventModal(true)} className="border border-gray-200 p-2 rounded-full flex items-center shadow-md hover:shadow">
            <img src={plusImg} alt="create_event" className="h-7 w-7" />
            <span className="pl-3 pr-7">Create</span>
        </button>
    );
};

export default CreateEventButton;
