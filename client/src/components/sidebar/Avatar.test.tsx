import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Avatar from './Avatar';

describe('Avatar Component', () => {
    test('renders the avatar image', () => {
        const { getByTestId } = render(<Avatar />);
        const avatarImg = getByTestId('avatar');
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', '/images/image-avatar.jpg');
        expect(avatarImg).toHaveAttribute('alt', 'avatar');
    });
});