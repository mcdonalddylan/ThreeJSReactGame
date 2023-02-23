import React from 'react';
import { HomePageContainer } from '../HomePageContainer';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

describe('<HomePageContainer />', () => {

    let mockStore;

    beforeEach(()=>{
        mockStore = {};
    });

    const setupRTL = () => {
        return render(
            <Provider store={mockStore}>
                <HomePageContainer />
            </Provider>
        );
    };

    test.skip('Clicking on github link sends you somewhere', () => {
        const { getAllByText } = setupRTL();

        const githubBtn = getAllByText('GitHub')[0];
        fireEvent.click(githubBtn);
        expect(getAllByText('idkman')).toHaveLength(1);
    });
});