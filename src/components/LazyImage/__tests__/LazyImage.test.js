import { render } from '@testing-library/react';
import { ArtPageContainer } from '../ArtPageContainer';

describe('<LazyImage />', () => {
    let props;

    beforeEach(() => {
        props = {};
    });

    const setupRTL = () => {
        return render(
            <ArtPageContainer />
        );
    };

    test('should render art container', () => {
        const { getByText } = setupRTL();
        expect(getByText('Art Projects:')).toBeInTheDocument(); 
    });
});