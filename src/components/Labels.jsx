import React, {useContext} from 'react';
import GlobalContext from "../context/GlobalContext.jsx";
import Switch from "./UI/switch/Switch.jsx";

const Labels = () => {
    const {labels, updateLabel} = useContext(GlobalContext);


    return (
        <div>
            <React.Fragment>
                <h2 className="text-2xl font-semibold text-gray-800 mt-9">
                    Shifts:
                </h2>
                {labels.length > 0 ? (
                    labels.map(({shift:shift, label:label, checked}, index) => (
                        <div key={index} className="flex items-center mt-4">
                            <Switch
                                checked={checked}
                                color={label}
                                onChange={(e) => updateLabel({shift: shift, label: label, checked: !checked})}
                            >
                            </Switch>
                            <span className="ml-12 text-gray-700 capitalize">
                                {shift}
                            </span>
                        </div>

                    ))
                ) : (
                    <p className="text-gray-500 mt-3">No shifts available</p>
                )}
            </React.Fragment>
        </div>
    );
};

export default Labels;
