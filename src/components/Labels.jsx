import React, {useContext} from 'react';
import GlobalContext from "../context/GlobalContext.jsx";

const Labels = () => {
    const {labels, updateLabel} = useContext(GlobalContext);
    console.log(labels)
    return (
        <div>
            <React.Fragment>
                <p className="text-gray-500 font-bold mt-10">
                    Label
                </p>
                {labels.map(({label:label, checked}, index) => (
                    <label key={index} className="items-center mt-3 block">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => updateLabel({label: label, checked: !checked})}
                            className={`form-checkbox h-5 w-5 text-${label}-400 rounded focus:rind-0 cursor-pointer`}
                        />
                        <span className="ml-2 text-gray-700 capitalize">{label}</span>
                    </label>
                ))}
            </React.Fragment>
        </div>
    );
};

export default Labels;
