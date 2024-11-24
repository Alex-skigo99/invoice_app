import React from 'react';
import './selectElem.css';

interface SelectElemProps {
    label?: string;
    items: string[];
    curSelection?: string;
    onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    testId?: string;
}

const SelectElem: React.FC<SelectElemProps> = ({ label, items, curSelection, onSelect, testId }) => {

    return (<>
        {label && <label htmlFor="select-elem" data-testid={`${testId}-label`}>{label}</label>}
        <select 
            className="select-elem" 
            name="select-elem" 
            data-testid={testId} 
            onChange={onSelect}
            value={curSelection}
        >
                {items.map((item, idx) => {
                    return <option key={idx} value={item}>{item}</option>
                })}
        </select>
     </>);
};

export default SelectElem;