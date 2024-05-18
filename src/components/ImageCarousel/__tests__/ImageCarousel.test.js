import { act, render, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'  -- Need to update this to version 14+ to use userEvent.setup() function
import { ImageCarousel } from '../ImageCarousel';
import { generateLazyImageObserver } from '../../../utils/internalPageUtils/internalPageUtils';

jest.mock('../../../utils/internalPageUtils/internalPageUtils');

describe('<ImageCarousel />', () => {
    let images,
        subtext,
        bgColor,
        color;

    beforeEach(() => {
        images = ['testimg1','testimg2','testimg3'];
        subtext = ['test subtext 1','test subtext 2','test subtext 3'];
        bgColor = '#ffffff';
        color = '#000000';
        generateLazyImageObserver.mockImplementation(() => { return {observe: (img) => {} }; });
    });

    const setupRTL = () => {
        return render(
            <ImageCarousel
                images={images}
                subtext={subtext}
                bgColor={bgColor}
                color={color} />
        );
    };

    test('should render subtext for the 2nd image by default', () => {
        const { getByText } = setupRTL();
        expect(getByText('test subtext 2')).toBeInTheDocument();
    });

    test('should render subtext for the 1st image after clicking on it', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-img1-btn').click());
        expect(getByText('test subtext 1')).toBeInTheDocument();
    });

    test('should render subtext for the 2nd image after clicking on it', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-img2-btn').click());
        expect(getByText('test subtext 2')).toBeInTheDocument();
    });

    test('should render subtext for the 3rd image after clicking on it', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-img3-btn').click());
        expect(getByText('test subtext 3')).toBeInTheDocument();
    });

    test('should render subtext for the 1st image after clicking the left nav button', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-left-btn').click());
        expect(getByText('test subtext 1')).toBeInTheDocument();
    });

    test('should render subtext for the 3rd image after clicking the right nav button', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-right-btn').click());
        expect(getByText('test subtext 3')).toBeInTheDocument();
    });

    test('should render subtext for the 1st image after clicking the right nav button twice', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-right-btn').click());
        act(() => getByTestId('img-carousel-right-btn').click());
        expect(getByText('test subtext 1')).toBeInTheDocument();
    });

    test('should render subtext for the 2nd image after clicking the right nav button three times', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-right-btn').click());
        act(() => getByTestId('img-carousel-right-btn').click());
        act(() => getByTestId('img-carousel-right-btn').click());
        expect(getByText('test subtext 2')).toBeInTheDocument();
    });

    test('should render subtext for the 3rd image after clicking the left nav button twice', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-left-btn').click());
        act(() => getByTestId('img-carousel-left-btn').click());
        expect(getByText('test subtext 3')).toBeInTheDocument();
    });

    test('should render subtext for the 3rd image after clicking the left nav button three times', () => {
        const { getByText, getByTestId } = setupRTL();
        act(() => getByTestId('img-carousel-left-btn').click());
        act(() => getByTestId('img-carousel-left-btn').click());
        act(() => getByTestId('img-carousel-left-btn').click());
        expect(getByText('test subtext 2')).toBeInTheDocument();
    });

    // TODO: Update testing library to version 14+ to support the userEvent.setup() function
    // test('should add the fade-in class and then remove it after changing the image in the carousel', () => {
    //     const user = userEvent.setup({ delay: null });
    //     jest.useFakeTimers();
    //     const { getByText, getByTestId } = setupRTL();
    //     act(() => getByTestId('img-carousel-left-btn').click());
    //     act(() => jest.runOnlyPendingTimers());
    //     waitFor(() => expect(getByText('test subtext 2')).toHaveClass('img-carousel-comp__subtext--fade-in'));
    //     jest.useRealTimers();
    //     waitFor(() => expect(getByText('test subtext 2')).not.toHaveClass('img-carousel-comp__subtext--fade-in'));
    // });
});