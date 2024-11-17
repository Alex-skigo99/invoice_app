import { render, cleanup } from '@testing-library/react';
import Logo from './Logo';

describe('Logo Component', () => {
    afterEach(cleanup);

    it('renders the logo image', () => {
        const { getByTestId } = render(<Logo />);
        const logoImg = getByTestId('logo-img');
        expect(logoImg).toBeInTheDocument();
        expect(logoImg).toHaveAttribute('src', '/images/logo.svg');
        expect(logoImg).toHaveAttribute('alt', 'logo');
    });

    it('renders the logo inner box', () => {
        const { getByTestId } = render(<Logo />);
        const innerBox = getByTestId('logo-inner-box');
        expect(innerBox).toBeInTheDocument();
    });
});