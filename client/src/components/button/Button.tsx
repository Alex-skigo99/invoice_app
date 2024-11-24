import './button.css';

interface ButtonProps {
    image?: string;
    title: string;
    width?: string;
    onClick: () => void;
    testId?: string;
};
const Button: React.FC<ButtonProps> = ({ image, title, width, onClick, testId }) => {
    const styleButton = {
        width: width || '100%',
    };
    return (
        <button className='button' style={styleButton} onClick={onClick} data-testid={testId}>
            {image && <img src={image} alt='image' />}
            {title}
        </button>
    );
};

export default Button;