import { render, act, waitFor } from '@testing-library/react';
import { ImagesContainer } from '../ImagesContainer';
import { generateLazyImageObserver } from '../../../utils/internalPageUtils/internalPageUtils';
import { useNavigate } from 'react-router-dom';

jest.mock('../../../utils/internalPageUtils/internalPageUtils');
jest.mock('react-router-dom');

describe('<ImagesContainer />', () => {
    let images,
        redirectString,
        animationCycle,
        animationSpeed;

    beforeEach(() => {
        images = ['img1.png', 'img2.png', 'img3.png', 'img4.png'];
        redirectString = '/art';
        animationCycle = 1;
        animationSpeed = 1;
        generateLazyImageObserver.mockImplementation(() => { return {observe: (img) => {} }; });
        useNavigate.mockImplementation(() => { return () => {global.alert(redirectString)}; });
    });

    const setupRTL = () => {
        return render(
            <ImagesContainer 
                images={images}
                redirectString={redirectString}
                animationCycle={animationCycle}
                animationSpeed={animationSpeed}/>
        );
    };

    test('should render images container when 4 images are given', () => {
        const { getByTestId } = setupRTL();
        expect(getByTestId('img1.png')).toBeInTheDocument(); 
        expect(getByTestId('img2.png')).toBeInTheDocument(); 
        expect(getByTestId('img3.png')).toBeInTheDocument(); 
        expect(getByTestId('img4.png')).toBeInTheDocument(); 
    });

    test('should render error when exactly images are not given', () => {
        images = ['img1.png'];
        const { getByText } = setupRTL();
        expect(getByText('ERROR: Need to pass exactly 4 images into this container.')).toBeInTheDocument(); 
    });

    test('should still render images container when 4 images are given and animation speed is undefined', () => {
        animationSpeed = undefined;
        const { getByTestId } = setupRTL();
        expect(getByTestId('img1.png')).toBeInTheDocument(); 
        expect(getByTestId('img2.png')).toBeInTheDocument(); 
        expect(getByTestId('img3.png')).toBeInTheDocument(); 
        expect(getByTestId('img4.png')).toBeInTheDocument(); 
    });

    test('should render img2 with fade-out class when animation cycle is 2', () => {
        animationCycle = 2;
        const { getByTestId } = setupRTL();
        expect(getByTestId('img2.png')).toHaveClass('img-fade-out');
        expect(getByTestId('img3.png')).toHaveClass('img-fade-in');
    });

    test('should render img3 with fade-out class when animation cycle is 3', () => {
        animationCycle = 3;
        const { getByTestId } = setupRTL();
        expect(getByTestId('img3.png')).toHaveClass('img-fade-out');
        expect(getByTestId('img4.png')).toHaveClass('img-fade-in');
    });

    test('should render img4 with fade-out class when animation cycle is 4', () => {
        animationCycle = 4;
        const { getByTestId } = setupRTL();
        expect(getByTestId('img4.png')).toHaveClass('img-fade-out');
        expect(getByTestId('img1.png')).toHaveClass('img-fade-in');
    });

    test('should call the passed in function upon clicking all 4 images', () => {
        const { getByTestId } = setupRTL();
        act(() => getByTestId('img1.png').click());
        waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1)); 
        act(() => getByTestId('img2.png').click());
        waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1)); 
        act(() => getByTestId('img3.png').click());
        waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1)); 
        act(() => getByTestId('img4.png').click());
        waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1)); 
    });
});