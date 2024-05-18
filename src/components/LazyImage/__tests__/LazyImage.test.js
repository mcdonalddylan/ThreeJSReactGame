import { render, waitFor, act } from '@testing-library/react';
import { LazyImage } from '../LazyImage';
import { generateLazyImageObserver } from '../../../utils/internalPageUtils/internalPageUtils';

jest.mock('../../../utils/internalPageUtils/internalPageUtils');

describe('<LazyImage />', () => {
    let src,
        alt,
        className,
        style,
        id,
        onClick;

    beforeEach(() => {
        src = 'test_image.png';
        alt = 'test alt text :D';
        className = 'test-class-babyyy';
        style = { overflow: 'hidden' };
        id = 'test-id';
        onClick = (id) => {global.alert(id)};
        generateLazyImageObserver.mockImplementation(() => { return {observe: (img) => {} }; }); 
    });

    const setupRTL = () => {
        return render(
            <LazyImage
                src={src}
                alt={alt}
                className={className}
                style={style}
                id={id}
                onClick={onClick}/>
        );
    };

    test('should render a lazy loaded image with the properties I give it', () => {
        const { getByTestId } = setupRTL();
        expect(getByTestId('test_image.png')).toHaveAttribute('data-src', 'test_image.png');
        expect(getByTestId('test_image.png')).toHaveAttribute('src');
        expect(getByTestId('test_image.png')).toHaveAttribute('id', 'test-id');
        expect(getByTestId('test_image.png')).toHaveAttribute('class', 'test-class-babyyy'); 
        expect(getByTestId('test_image.png')).toHaveAttribute('style', "overflow: hidden;"); 
        expect(getByTestId('test_image.png')).toHaveAttribute('alt', 'test alt text :D');
    });

    test('should display alert after clicking on the lazy image', () => {
        const { getByTestId } = setupRTL();
        act(() => getByTestId('test_image.png').click());
        waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
    });
});