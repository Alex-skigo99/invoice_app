import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle Component', () => {
    test('it should render the light theme by default', () => {
        const { getByTestId } = render(<ThemeToggle />);
        expect(getByTestId('moon')).toBeInTheDocument();
        expect(document.body).toHaveClass('light-theme');
    });

    test('it should toggle to dark theme when clicked', () => {
        const { getByTestId } = render(<ThemeToggle />);
        const toggleDiv = getByTestId('moon').parentElement;
        fireEvent.click(toggleDiv!);
        expect(getByTestId('sun')).toBeInTheDocument();
        expect(document.body).toHaveClass('dark-theme');
    });

    test('it should toggle back to light theme when clicked again', () => {
        const { getByTestId } = render(<ThemeToggle />);
        const toggleDiv = getByTestId('moon').parentElement;
        fireEvent.click(toggleDiv!);
        fireEvent.click(toggleDiv!);
        expect(getByTestId('moon')).toBeInTheDocument();
        expect(document.body).toHaveClass('light-theme');
    });
});