import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectElem from './SelectElem';
import exp from 'constants';

describe('SelectElem Component', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const curSelection = 'Item 2';
    const onSelect = jest.fn();

    test('renders the label correctly', () => {
        render(<SelectElem label={'Select Item'} items={items} onSelect={onSelect} testId={'select-elem'} />);
        const selectElem = screen.getByTestId('select-elem-label') as HTMLSelectElement;
        expect(selectElem).toBeInTheDocument();
        expect(selectElem).toHaveTextContent('Select Item');
    });

    test('renders the select element with correct options', () => {
        render(<SelectElem items={items} onSelect={onSelect} testId={'select-elem'} />);
        const selectElem = screen.getByTestId('select-elem') as HTMLSelectElement;
        expect(selectElem).toHaveTextContent('Item 1');
        expect(selectElem).toHaveTextContent('Item 2');
        expect(selectElem).toHaveTextContent('Item 3');
        expect(selectElem).toHaveValue('Item 1');
    });

    test('sets the correct initial selection', () => {
        render(<SelectElem items={items} curSelection={curSelection} onSelect={onSelect} testId={'select-elem'} />);
        const selectElem = screen.getByTestId('select-elem') as HTMLSelectElement;
        expect(selectElem.value).toBe(curSelection);
    });

    test('calls onSelect when an option is selected', () => {
        render(<SelectElem items={items} onSelect={onSelect} testId={'select-elem'} />);
        const selectElem = screen.getByTestId('select-elem');
        fireEvent.change(selectElem, { target: { value: 'Item 2' } });
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(selectElem).toHaveValue('Item 2');
    });
});