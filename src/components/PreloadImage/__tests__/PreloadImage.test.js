import { render, act, waitFor } from '@testing-library/react';
import { PreloadImage } from '../PreloadImage';

describe('<PreloadImage />', () => {
    let src,
        alt,
        className,
        onClick,
        id,
        animationSpeed;

    beforeEach(() => {
        src = 'test.png';
        id = 'image-id';
        alt = 'img-alt';
        className = 'test-class-babyyy';
        onClick = () => { alert('wassup'); };
        animationSpeed = 2;
    });

    const setupRTL = () => {
        return render(
            <PreloadImage
                src={src}
                alt={alt}
                onClick={onClick}
                className={className}
                id={id}
                animationSpeed={animationSpeed}/>
        );
    };

    test('should render a preloaded image with the properties I give it', () => {
        const { getByTestId } = setupRTL();
        waitFor(() => expect(getByTestId('test.png')).toHaveAttribute('src', 'test.png'));
        waitFor(() => expect(getByTestId('test.png')).toHaveAttribute('id', 'image-id'));
        waitFor(() => expect(getByTestId('test.png')).toHaveAttribute('class', 'test-class-babyyy')); 
        //expect(getByTestId('test.png')).toHaveAttribute('style', "overflow: hidden;"); 
        waitFor(() => expect(getByTestId('test.png')).toHaveAttribute('alt', 'img-alt'));
        waitFor(() => expect(getByTestId('test.png')).toHaveAttribute('style', 'animation-duration: 2s;'));
    });

    test('should render default alt text if no alt property is passed in', () => {
        alt = undefined;
        const { getByTestId } = setupRTL();
        waitFor(() => expect(getByTestId('test.png')).toHaveAttribute('alt', 'preloaded-img'));
    });

    test('should render default animation duration if no animationSpeed property is passed in', () => {
        animationSpeed = undefined;
        const { getByTestId } = setupRTL();
        waitFor(() => expect(getByTestId('test.png')).toHaveAttribute('style', 'animation-duration: 3s;'));
    });
});