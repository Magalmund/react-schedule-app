import React, {useContext} from 'react';
import GlobalContext from "../context/GlobalContext.jsx";

const Labels = () => {
    const {labels, updateLabel} = useContext(GlobalContext);

    console.log(labels);

    return (
        <div>
            <React.Fragment>
                <h2 className="text-2xl font-semibold text-gray-800 mt-9">
                    Shifts:
                </h2>
                {labels.length > 0 ? (
                    labels.map(({shift:shift, label:label, checked}, index) => (
                        <label key={index} className="items-center mt-3 block">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => updateLabel({shift: shift, label: label, checked: !checked})}
                                style={{ accentColor: `var(--color-${label}-400)` }}
                                className={`form-checkbox h-5 w-5 rounded focus:rind-0 cursor-pointer`}
                            />
                            <span className="ml-2 text-gray-700 capitalize">
                            {shift}
                        </span>
                        </label>
                    ))
                ) : (
                    <p className="text-gray-500 mt-3">No shifts available</p>
                )}
            </React.Fragment>
        </div>
    );
};

export default Labels;
