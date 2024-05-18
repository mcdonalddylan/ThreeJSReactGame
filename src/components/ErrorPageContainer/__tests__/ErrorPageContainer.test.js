import { render } from '@testing-library/react';
import { ErrorPageContainer } from '../ErrorPageContainer';

describe('<ErrorPageContainer />', () => {

    const setupRTL = () => {
        return render(
            <ErrorPageContainer />
        );
    };

    test('should render error page container', () => {
        const { getByTestId } = setupRTL();
        expect(getByTestId('error-page-container')).toBeInTheDocument(); 
    });
});