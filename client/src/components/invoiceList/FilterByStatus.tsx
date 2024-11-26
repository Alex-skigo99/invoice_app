import React, { useContext } from 'react';
import { InvoiceListContext } from './InvoiceList';
import SelectElem from '../selectElem/SelectElem';

const FilterByStatus: React.FC<{label: string}> = ({label}) => {
    const context = useContext(InvoiceListContext);
    if (!context) {
        throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
    }
    const {statusFilter, setStatusFilter} = context;
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
    };
    const statusList = ['all', 'paid', 'pending', 'draft'];

    return (
        <SelectElem 
            label={label} 
            items={statusList} 
            curSelection={statusFilter} 
            onSelect={handleStatusChange}
            testId='select-status'
        />
    );
};

export default FilterByStatus;