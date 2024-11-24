import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
    test('renders with testId', () => {
        const { getByTestId } = render(<Button title="Click Me" onClick={() => {}} testId="button-1" />);
        expect(getByTestId('button-1')).toBeInTheDocument();
    });

    test('renders with title/image/width', () => {
        const { getByTestId } = render(<Button image="test.png" title="Click Me" width="200px" onClick={() => {}} testId="button-1" />);
        const btn = getByTestId('button-1');
        expect(btn).toHaveTextContent('Click Me');
        const img = btn.querySelector('img');
        expect(img).toHaveAttribute('src', 'test.png');
        expect(btn).toHaveStyle('width: 200px');
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        const { getByTestId } = render(<Button title="Click Me" onClick={handleClick} testId="button-1" />);
        fireEvent.click(getByTestId('button-1'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});